import React, { useEffect, useState } from "react";
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

import externalLink from "../assets/external-link.svg";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Swal from "sweetalert2";
import { myPrivateAxios } from "../utils/api";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import "./ManageSkills.css";

import { ThemeContext } from "../context/ThemeProvider"; // Adjust the import path

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const handleClick = () => {
    const id = Date.now();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "",
        icon: "",
        description: "",
        experience: "",
        priorityOrder: "",
        type: "",
        certificateLink: "",
        organizationName: "",
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
        Add Skill
      </Button>
    </GridToolbarContainer>
  );
}

export default function ManageSkills() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [expanded, setExpanded] = useState({});
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

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await myPrivateAxios.get(`/skills`);
      const rowsWithId = response.data.map((skill) => ({
        id: skill._id, // Use _id as id
        name: skill.name,
        icon: skill.icon,
        description: skill.description,
        experience: skill.experience,
        priorityOrder: skill.priorityOrder,
        type: skill.type,
        certificateLink: skill.certificateLink,
        organizationName: skill.organizationName,
      }));
      setRows(rowsWithId);
    } catch (error) {
      console.error("Error fetching the skills data:", error);
    }
  };

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

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        myPrivateAxios
          .delete(`/skills/${id}`)
          .then(() => {
            // Filter out the deleted row
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));

            // Fetch the updated skills list
            fetchSkills();

            // Show success message
            Swal.fire("Deleted!", "Skill has been deleted.", "success");
          })
          .catch((error) => {
            // Handle error during deletion
            Swal.fire("Error", "Error deleting skill.", "error");
          });
      }
    });
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

      if (newRow.isNew) {
        // Make API call to create a new row
        await myPrivateAxios.post(`/skills`, updatedRow);
        fetchSkills();
        Swal.fire("Success", "Skill added successfully", "success");
        console.log("Row created successfully:", updatedRow);
      } else {
        // Make API call to update an existing row
        await myPrivateAxios.put(`/skills`, updatedRow);
        fetchSkills();
        Swal.fire("Success", "Skill Updated successfully", "success");
        console.log("Row updated successfully:", updatedRow);
      }
      return updatedRow;
    } catch (error) {
      console.error("Error saving row:", error);
      Swal.fire({
        title: "Error",
        text: "Error Submitting Skill",
        icon: "error", // Use `icon: "error"` instead of passing it as a string argument
      });

      // Optionally return the old row if there's an error
      return newRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200, editable: true },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Progg. Language",
        "Frontend",
        "Backend",
        "Database",
        "Technology",
        "Tool",
        "Others",
      ], // Dropdown options for status
    },
    { field: "icon", headerName: "Icon", width: 200, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 450,
      editable: true,
    },
    {
      field: "priorityOrder",
      headerName: "Priority",
      width: 150,
      editable: true,
    },
    {
      field: "experience",
      headerName: "Experience",
      width: 150,
      editable: true,
    },
    {
      field: "certificateLink",
      headerName: "Certificate Link",
      width: 150,
      editable: true,
    },
    {
      field: "organizationName",
      headerName: "Organization Name",
      width: 150,
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
              onClick={handleSaveClick(id)} // Correctly reference the save handler
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)} // Correctly reference the cancel handler
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)} // Correctly reference the edit handler
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)} // Pass reference to delete handler
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <MUIThemeProvider theme={muiTheme}>
        <Container>
          <h2 className="modern-heading">Manage Skills</h2>
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
        </Container>
      </MUIThemeProvider>
      <Container className="mt-5" data-aos="fade-up">
        <h2 className="modern-heading">Skills</h2>
        <Row>
          {rows.map((skill) => (
            <Col md={{ size: 4, offset: 0 }} key={skill._id} data-aos="fade-up">
              <Card className="skill-card">
                <CardBody>
                  <header>
                    <div className="skill-title-container">
                      <CardTitle tag="h3" className="skill-title">
                        {skill.name}
                        {"  "}
                        <i class={skill.icon}></i>
                      </CardTitle>
                    </div>
                    <div className="skill-links">
                      <a
                        href={skill.certificateLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={externalLink} alt="Visit site" />
                      </a>
                    </div>
                  </header>
                  <CardText>
                    <h4 className="skill-organization">
                      {skill.organizationName}
                    </h4>
                    <p className="skill-description">
                      {expanded[skill.id]
                        ? skill.description
                        : `${skill.description.substring(0, 100)}...`}
                      {skill.description.length > 100 && (
                        <a
                          onClick={() => toggleExpand(skill.id)} // Toggle only for the clicked skill
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {expanded[skill.id] ? "Show less" : "Show more"}
                        </a>
                      )}
                    </p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
