import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Container,
  Row,
  Col,
} from "reactstrap";
import Loader from "../ui-elements/Loader";
import { showErrorToast, showSuccessToast } from "../ui-elements/toastConfig";
import "./Contact.css";
import { myAxios } from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [errorData, setErrorData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Create refs to scroll to error fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const mobileNumberRef = useRef(null);
  const messageRef = useRef(null);

  const validateForm = () => {
    const errors = {};
    let hasError = false;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
      hasError = true;
      if (emailRef.current) {
        emailRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile Number must be 10 digits.";
      hasError = true;
      if (mobileNumberRef.current && !errors.email) {
        mobileNumberRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (formData.message.trim().length === 0) {
      errors.message = "Message cannot be empty.";
      hasError = true;
      if (messageRef.current && !errors.email && !errors.mobileNumber) {
        messageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (formData.name.trim().length === 0) {
      errors.name = "Name cannot be empty.";
      hasError = true;
      if (nameRef.current && !errors.message && !errors.email && !errors.mobileNumber) {
        nameRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }

    setErrorData(errors);
    return !hasError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input is for the phone field, allow only numeric characters
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); // Replace any non-digit character
      setFormData((prevData) => ({
        ...prevData,
        phone: numericValue,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Reset the error for the specific field being typed in
    setErrorData((prevErrorData) => ({
      ...prevErrorData,
      [name]: "", // Clear the error for the current field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        const response = await myAxios.post(`/contact`, formData);
        showSuccessToast("Message sent successfully!");
        
        // Reset the form data only on successful submission
        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          message: "",
        });
      } catch (error) {
        showErrorToast("Error Sending Message!");
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  return (
    <Container className="text-white">
      <Row>
        <Col md={6} className="mx-auto">
          <h2 data-aos="fade-up" className="text-center my-4">
            Contact Me
          </h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup data-aos="fade-right" innerRef={nameRef}>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                className="input-dark"
                id="name"
                placeholder="Enter your Name"
                value={formData.name}
                invalid={!!errorData.name}
                onChange={handleChange}
              />
              <FormFeedback>{errorData.name}</FormFeedback>
            </FormGroup>
            <FormGroup data-aos="fade-right" innerRef={emailRef}>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                className="input-dark"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                invalid={!!errorData.email}
                onChange={handleChange}
              />
              <FormFeedback>{errorData.email}</FormFeedback>
            </FormGroup>
            <FormGroup data-aos="fade-left" innerRef={mobileNumberRef}>
              <Label for="mobileNumber">Mobile Number</Label>
              <Input
                type="text"
                name="mobileNumber"
                maxLength={10}
                id="mobileNumber"
                className="input-dark"
                placeholder="Enter your Mobile number"
                value={formData.mobileNumber}
                invalid={!!errorData.mobileNumber}
                onChange={handleChange}
              />
              <FormFeedback>{errorData.mobileNumber}</FormFeedback>
            </FormGroup>
            <FormGroup data-aos="fade-right" innerRef={messageRef}>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                className="input-dark"
                style={{ height: "160px" }} // Adjust the height as needed
                placeholder="Enter your message"
                value={formData.message}
                invalid={!!errorData.message}
                onChange={handleChange}
              />
              <FormFeedback>{errorData.message}</FormFeedback>
            </FormGroup>
            {isLoading ? (
              <Loader type="triangle" />
            ) : (
              <Button
                color="primary"
                style={{ marginTop: "20px" }}
                block
                disabled={isLoading}
                data-aos="fade-up"
              >
                Send
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
