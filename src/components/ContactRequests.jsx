import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"; // Import the trash icon from React Icons
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useDropzone } from "react-dropzone"; // Import useDropzone
import { myAxios } from "../utils/api";
import { showSuccessToast, showErrorToast } from "../ui-elements/toastConfig";
import "./ContactRequests.css";
import Loader from "../ui-elements/Loader";

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

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const response = await myAxios.get("/contact");
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
      await myAxios.post("/contact/send-email", formData);
      showSuccessToast("Reply sent successfully!");
      setReplyData({ subject: "", body: "", attachments: [] }); // Reset after sending
    } catch (error) {
      showErrorToast("Error sending reply!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id) => {
    setIsLoading(true);
    try {
      await myAxios.delete(`/contact/${id}`);
      setRequests(requests.filter((request) => request.id !== id));
      fetchRequests();
      showSuccessToast("Request Removed Successfully!");
    } catch (error) {
      showErrorToast("Error Removing request!");
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container className="text-white">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="text-center my-4">Contact Requests</h2>
          {isLoading && 
            <Loader type="bars" />}
           {
            requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                toggleModal={toggleModal}
                handleRemove={handleRemove}
              />
            ))
          }
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
