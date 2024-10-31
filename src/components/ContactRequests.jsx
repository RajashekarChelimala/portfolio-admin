import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone"; // Import useDropzone
import { FaTrash } from "react-icons/fa"; // Import the trash icon from React Icons
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import useSocket from "../hooks/useSocket";
import Loader from "../ui-elements/Loader";
import { sweetAlert } from "../ui-elements/sweetAlert";
import { showErrorToast, showSuccessToast } from "../ui-elements/toastConfig";
import { myPrivateAxios } from "../utils/api";
import "./ContactRequests.css";

const ContactRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [replyData, setReplyData] = useState({
    subject: "",
    body: "",
    attachments: [], // Change to array for multiple files
  });

  const handleNewContact = (newContact) => {
    console.log("newContact",newContact);
    showSuccessToast(`New Contact Request from ${newContact.name}`);
    setRequests((prevRequests) => [newContact, ...prevRequests]);
  };

  useSocket("newContact", handleNewContact);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await myPrivateAxios.get("/contact");
      setRequests(response.data);
    } catch (error) {
      showErrorToast("Error fetching contact requests!");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = (request) => {
    setSelectedRequest(request);
    setModal(!modal);
  };

  const handleReplyChange = (e) => {
    const { name, value } = e.target;
    setReplyData({ ...replyData, [name]: value });
  };

  const onDrop = (acceptedFiles) => {
    setReplyData((prevData) => ({
      ...prevData,
      attachments: [...prevData.attachments, ...acceptedFiles],
    }));
  };

  const handleRemoveFile = (fileName) => {
    setReplyData((prevData) => ({
      ...prevData,
      attachments: prevData.attachments.filter(
        (file) => file.name !== fileName
      ),
    }));
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModal(false);
    const formData = new FormData();
    formData.append("subject", replyData.subject);
    formData.append("body", replyData.body);
    replyData.attachments.forEach((file) => {
      formData.append("attachments", file);
    });
    formData.append("to", selectedRequest.email);

    try {
      await myPrivateAxios.post("/contact/send-email", formData);
      // showSuccessToast("Reply sent successfully!");
      sweetAlert({
        type: "success",
        title: "Success!",
        text: "Replied through Email!",
        timer: 2000, // Auto-close after 2 seconds
      });
      setReplyData({ subject: "", body: "", attachments: [] }); // Reset after sending
    } catch (error) {
      // showErrorToast("Error sending reply!");
      sweetAlert({
        type: "error",
        title: "Error!",
        text: "Error sending reply!",
        timer: 2000, // Auto-close after 2 seconds
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id) => {
    setIsLoading(true);
    try {
      // Show the confirmation alert
      const result = await sweetAlert({
        showConfirmButton: true,
        showCancelButton: true,
      });

      // Check if the user confirmed
      if (result.isConfirmed) {
        // Proceed with the deletion
        await myPrivateAxios.delete(`/contact/${id}`);
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );

        // Fetch updated requests
        fetchRequests();

        // Show success toast
        sweetAlert({
          type: "success",
          title: "Success!",
          text: "Request Removed Successfully!",
          timer: 2000, // Auto-close after 2 seconds
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // User clicked cancel
        console.log("Cancelled!");
      }
    } catch (error) {
      // Show error toast if there's an issue
      sweetAlert({
        type: "error",
        title: "Error!",
        text: "Error Removing request!",
        timer: 2000, // Auto-close after 2 seconds
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container className="text-white contact-request">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="text-center my-4">Contact Requests</h2>
          {isLoading && <Loader type="bars" />}
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              toggleModal={toggleModal}
              handleRemove={handleRemove}
            />
          ))}
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={() => toggleModal(null)}>
        <ModalHeader toggle={() => toggleModal(null)}>
          Replying to {selectedRequest ? selectedRequest.name : ""}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleReplySubmit}>
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input
                type="text"
                name="subject"
                id="subject"
                value={replyData.subject}
                onChange={handleReplyChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input
                type="textarea"
                name="body"
                id="body"
                value={replyData.body}
                onChange={handleReplyChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="attachment">Attach Files</Label>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
              <div>
                <h5>Selected Files:</h5>
                <ul>
                  {replyData.attachments.map((file) => (
                    <li
                      key={file.name}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <span>{file.name}</span>
                      <Button
                        color="danger"
                        size="sm"
                        className="selected-file-remove-button"
                        onClick={() => handleRemoveFile(file.name)}
                        outline // Makes the button look less aggressive
                      >
                        <FaTrash /> {/* Use the trash icon */}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </FormGroup>
            <ModalFooter>
              <Button type="submit" color="primary">
                Send
              </Button>
              <Button color="secondary" onClick={() => toggleModal(null)}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

const RequestCard = ({ request, toggleModal, handleRemove }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Card className="my-3 request-card" data-aos="fade-up">
      <CardBody>
        <CardTitle tag="h5">{request.name}</CardTitle>
        <CardText>{request.email}</CardText>
        <CardText>
          {isExpanded || request.message.length <= 100 ? (
            request.message
          ) : (
            <>
              {request.message.substring(0, 100)}...
              <Button color="link" className="p-0" onClick={toggleExpanded}>
                Show more
              </Button>
            </>
          )}
        </CardText>
        <Button color="primary" onClick={() => toggleModal(request)}>
          Reply
        </Button>
        <Button
          color="danger"
          className="ml-2"
          onClick={() => handleRemove(request._id)}
        >
          Remove
        </Button>
      </CardBody>
      {isExpanded && (
        <CardFooter className="text-muted">
          <Button color="link" className="p-0" onClick={toggleExpanded}>
            Show less
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ContactRequests;
