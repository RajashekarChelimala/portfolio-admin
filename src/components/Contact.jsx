import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Loader from "../ui-elements/Loader";
import { sweetAlert } from "../ui-elements/sweetAlert";
import { showErrorToast } from "../ui-elements/toastConfig";
import { myAxios } from "../utils/api";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
    recaptchaToken: "", // Add reCAPTCHA token to form data
  });

  const [errorData, setErrorData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false); // New state to track reCAPTCHA verification

  const recaptchaRef = useRef(null); // Add reCAPTCHA reference

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
      if (
        nameRef.current &&
        !errors.message &&
        !errors.email &&
        !errors.mobileNumber
      ) {
        nameRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }

    setErrorData(errors);
    return !hasError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      const numericValue = value.replace(/\D/g, ""); // Replace any non-digit character
      setFormData((prevData) => ({
        ...prevData,
        mobileNumber: numericValue,
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrorData((prevErrorData) => ({
      ...prevErrorData,
      [name]: "", // Clear the error for the current field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is valid and reCAPTCHA is solved
    if (validateForm() && isRecaptchaVerified) {
      setIsLoading(true);

      try {
        await myAxios.post(`/contact`, formData);
        // showSuccessToast("Message sent successfully!");
        sweetAlert({
          type: "success",
          title: "Success!",
          text: "Message sent successfully!",
          timer: 2000, // Auto-close after 2 seconds
        });

        // Reset the form data only on successful submission
        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          message: "",
          recaptchaToken: "", // Reset reCAPTCHA token
        });

        if (recaptchaRef.current) recaptchaRef.current.reset(); // Reset reCAPTCHA widget
        setIsRecaptchaVerified(false); // Reset reCAPTCHA verification state
      } catch (error) {
        // showErrorToast("Error Sending Message!");
        sweetAlert({
          type: "error",
          title: "Error!",
          text: "Error Sending Message!",
          timer: 2000, // Auto-close after 2 seconds
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      showErrorToast("Please complete the reCAPTCHA verification.");
    }
  };

  const handleRecaptchaChange = (token) => {
    setFormData((prevData) => ({
      ...prevData,
      recaptchaToken: token, // Update reCAPTCHA token in formData
    }));
    setIsRecaptchaVerified(true); // reCAPTCHA is verified
  };

  const handleRecaptchaExpired = () => {
    setIsRecaptchaVerified(false); // reCAPTCHA expired, disable send button again
    setFormData((prevData) => ({
      ...prevData,
      recaptchaToken: "", // Clear token when reCAPTCHA expires
    }));
  };

  return (
    <Container className="contact">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 data-aos="fade-up" className="text-center my-4">
            Contact Me
          </h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup data-aos="fade-right" innerRef={nameRef}>
              <Label for="name">Name</Label>
              <Input
                type="text"
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
                style={{ height: "160px" }}
                placeholder="Enter your message"
                value={formData.message}
                invalid={!!errorData.message}
                onChange={handleChange}
              />
              <FormFeedback>{errorData.message}</FormFeedback>
            </FormGroup>

            {/* Add reCAPTCHA */}
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY} // Replace with your site key
              onChange={handleRecaptchaChange}
              onExpired={handleRecaptchaExpired} // Handle when reCAPTCHA expires
            />

            {isLoading ? (
              <Loader type="triangle" />
            ) : (
              <Button
                color="primary"
                style={{ marginTop: "10px" }}
                block
                disabled={!isRecaptchaVerified || isLoading} // Disable until reCAPTCHA is verified
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
