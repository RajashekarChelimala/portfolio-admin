import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import { Container } from "reactstrap";
import { showErrorToast, showSuccessToast } from "../ui-elements/toastConfig";
import { ThemeContext } from "../context/ThemeProvider"; 
import "./Services.css";
import { sweetAlert } from "../ui-elements/sweetAlert";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const handleClick = () => {
    const id = Date.now();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        serviceName: "",
        iconName: "",
        targetUrl: "",
        displayOrder: "",
        isActive: true,
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "serviceName" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Service
      </Button>
    </GridToolbarContainer>
  );
}

export default function Services() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const { theme } = React.useContext(ThemeContext);
  // Create the theme dynamically based on context
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
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const rowsWithId = response.data.map((service) => ({
          id: service._id, // Use _id as id
          serviceName: service.serviceName,
          iconName: service.iconName,
          targetUrl: service.targetUrl,
          displayOrder: service.displayOrder,
          isActive: service.isActive,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt,
        }));
        setRows(rowsWithId);
      } catch (error) {
        console.error("Error fetching the services data:", error);
      }
    };

    fetchServices();
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
    console.log("row", row);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/services/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => console.error("Error deleting service:", error));
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

      const token = localStorage.getItem("accessToken");

      if (newRow.isNew) {
        const { id, isNew, ...payload } = newRow;
        // Make API call to create a new row
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/services`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(response => {
          // showSuccessToast("Service saved successfully!");
          sweetAlert({
            type: 'success',
            title: 'Success!',
            text: 'Service saved successfully!',
            timer: 2000, // Auto-close after 2 seconds
          });
          console.log("Row created successfully:", payload);
        })
        .catch(err => {
          // showErrorToast("Error saving service.");
          sweetAlert({
            type: 'error',
            title: 'Error!',
            text: 'Error saving service.',
            timer: 2000, // Auto-close after 2 seconds
          });
          console.error("Error saving service:", err);
        });
      }
       else {
        const { isNew, ...payload } = newRow;
        // Make API call to update an existing row
        await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/services`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(response => {
          // showSuccessToast("Service updated successfully!");
          sweetAlert({
            type: 'success',
            title: 'Success!',
            text: 'Service updated successfully!',
            timer: 2000, // Auto-close after 2 seconds
          });
          console.log("Row updated successfully:", payload);
        })
        .catch(err => {
          // showErrorToast("Error updating service.");
          sweetAlert({
            type: 'error',
            title: 'Error!',
            text: 'Error updating service.',
            timer: 2000, // Auto-close after 2 seconds
          });
          console.error("Error updating service:", err);
        });
      }

      return updatedRow;
    } catch (error) {
      console.error("Error saving row:", error);
      // Optionally return the old row if there's an error
      return newRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "serviceName",
      headerName: "Service Name",
      width: 200,
      editable: true,
    },
    { field: "iconName", headerName: "Icon Name", width: 150, editable: true },
    {
      field: "targetUrl",
      headerName: "Target URL",
      width: 250,
      editable: true,
    },
    {
      field: "displayOrder",
      headerName: "Display Order",
      width: 150,
      editable: true,
    },
    {
      field: "isActive",
      headerName: "Active",
      type: "boolean",
      width: 100,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
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
    <Container className="text-white manage-services">
      <h2>Manage Services</h2>
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
    </Container>
  );
}