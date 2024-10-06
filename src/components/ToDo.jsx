import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

import { ThemeContext } from '../context/ThemeProvider'; // Adjust the import path

function EditToolbar(props) {

  const { setRows, setRowModesModel } = props;
  const handleClick = () => {
    const id = Date.now();
    setRows((oldRows) => [...oldRows, { id, title: '', description: '', dueDate: '', priority: '', status: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'serviceName' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add ToDo
      </Button>
    </GridToolbarContainer>
  );
}

export default function ToDo() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const { theme } = React.useContext(ThemeContext); // Use ThemeContext

  const muiTheme = createTheme({
    palette: {
      mode: theme, // Use the current theme from context
      background: {
        default: theme === "dark" ? "#000" : "#fff", // Adjust based on theme
        paper: "transparent",
      },
      text: {
        primary: theme === "dark" ? "#fff" : "#000", // Adjust based on theme
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
          },
          columnHeaders: {
            backgroundColor: "transparent",
            color: theme === "dark" ? "#fff" : "#000", // Adjust based on theme
          },
          cell: {
            color: theme === "dark" ? "#fff" : "#000", // Adjust based on theme
          },
          toolbar: {
            color: theme === "dark" ? "#fff" : "#000", // Adjust based on theme
          },
          icon: {
            color: theme === "dark" ? "#fff" : "#000", // Adjust based on theme
          },
        },
      },
    },
  });

  React.useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/todo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const rowsWithId = response.data.map(todo => ({
          id: todo._id, // Use _id as id
          title: todo.title,
          description: todo.description,
          dueDate: new Date(todo.dueDate),
          priority: todo.priority,
          status: todo.status,
        }));
        setRows(rowsWithId);

      } catch (error) {
        console.error('Error fetching the todo data:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const row = rows.find((row) => row.id === id);
    console.log("row",row);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    // console.log("Testing delete:",id)
    // setRows(rows.filter((row) => row.id !== id));
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      console.log("Processing row update:", newRow);
  
      // Update the row in the state
      const updatedRow = { ...newRow, isNew: false };
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
      );
  
      const token = localStorage.getItem('accessToken');
  
      if (newRow.isNew) {
        // Make API call to create a new row
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/todo`, updatedRow, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Row created successfully:", updatedRow);
      } else {
        // Make API call to update an existing row
        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/todo`, updatedRow, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Row updated successfully:", updatedRow);
      }
  
      return updatedRow;
    } catch (error) {
      console.error('Error saving row:', error);
      // Optionally return the old row if there's an error
      return newRow;
    }
  };
  

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 200, editable: true },
    { field: 'description', headerName: 'Description', width: 750, editable: true },
    { field: 'dueDate', headerName: 'Due Date', type: 'date', width: 120, editable: true },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Low', 'Medium', 'High'], // Dropdown options for priority
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Pending', 'In Progress', 'Completed'], // Dropdown options for status
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
  
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <MUIThemeProvider theme={muiTheme}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
     </MUIThemeProvider>
  );
}
