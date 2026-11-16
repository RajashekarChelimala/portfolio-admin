import React, { useState, useEffect } from "react";
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
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineSend,
  AiOutlineCheck,
  AiOutlineCopy,
  AiFillGithub,
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineApartment,
  AiOutlineRead
} from "react-icons/ai";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { sweetAlert } from "../ui-elements/sweetAlert";
import { showSuccessToast, showErrorToast } from "../ui-elements/toastConfig";
import { myAxios } from "../utils/api";
import { DEFAULT_CONTENT } from "../utils/fallbackData";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [errorData, setErrorData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchContent = async () => {
      try {
        const response = await myAxios.get("/content");
        if (response.data) {
          setContent((prev) => ({ ...prev, ...response.data }));
        }
      } catch (err) {
        // Fallback already set
      }
    };
    fetchContent();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Please enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile Number must be 10 digits.";
    }
    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty.";
    }

    setErrorData(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNumber") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errorData[name]) {
      setErrorData((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await myAxios.post("/contact", {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobileNumber || "Not Provided",
        message: formData.message,
      });

      sweetAlert(
        "Message Sent!",
        "Thank you for reaching out! I will get back to you shortly.",
        "success"
      );
      setFormData({ name: "", email: "", mobileNumber: "", message: "" });
      setErrorData({});
    } catch (error) {
      console.error("Contact submit error:", error);
      showErrorToast(
        error.response?.data?.message || "Failed to deliver message. Please email me directly."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const targetEmail = content.email || "rajashekarchelimala1@gmail.com";
  const targetPhone = content.phone || "+91 9908545367";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopiedEmail(true);
    showSuccessToast("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(targetPhone);
    setCopiedPhone(true);
    showSuccessToast("Phone number copied to clipboard!");
    setTimeout(() => setCopiedPhone(false), 3000);
  };

  return (
    <div className="contact-page">
      <Container>
        {/* Header Section */}
        <section className="contact-header text-center my-4">
          <span className="status-pill mb-3">
            <span className="pulse-dot" /> Get in Touch
          </span>
          <h1 className="section-title">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h1>
          <p className="section-subtitle">
            Whether you have an enterprise project, full-stack opportunity, or just want to connect, feel free to reach out.
          </p>
        </section>

        {/* Contact Grid */}
        <Row className="g-4 my-3">
          {/* Left Column: Direct Info Card */}
          <Col lg={5} md={12}>
            <div className="contact-info-card glass-panel h-100">
              <h3 className="info-card-title">Direct Channels</h3>
              <p className="info-card-desc">
                Feel free to email, call, or message me directly on WhatsApp. I typically reply within a few hours.
              </p>

              {/* Quick Email Pill */}
              <div className="contact-quick-pill mb-3">
                <div className="d-flex align-items-center gap-2 text-truncate">
                  <div className="pill-icon-wrap"><AiOutlineMail /></div>
                  <div className="pill-text-wrap text-truncate">
                    <span className="pill-sub">Email</span>
                    <a href={`mailto:${targetEmail}`} className="pill-main text-truncate">{targetEmail}</a>
                  </div>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <AiOutlineCheck className="text-success" /> : <AiOutlineCopy />}
                </button>
              </div>

              {/* Quick Phone Pill */}
              <div className="contact-quick-pill mb-4">
                <div className="d-flex align-items-center gap-2 text-truncate">
                  <div className="pill-icon-wrap phone"><AiOutlinePhone /></div>
                  <div className="pill-text-wrap text-truncate">
                    <span className="pill-sub">Phone / WhatsApp</span>
                    <a href={`tel:${targetPhone.replace(/\s+/g, "")}`} className="pill-main">{targetPhone}</a>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-1">
                  <a
                    href={`https://wa.me/919908545367?text=Hi%20Rajashekar,%20I%20saw%20your%20portfolio...`}
                    target="_blank"
                    rel="noreferrer"
                    className="quick-icon-btn whatsapp-btn"
                    title="Chat on WhatsApp"
                    aria-label="Chat on WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={handleCopyPhone}
                    title="Copy phone"
                    aria-label="Copy phone"
                  >
                    {copiedPhone ? <AiOutlineCheck className="text-success" /> : <AiOutlineCopy />}
                  </button>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="channel-list">
                <div className="channel-item">
                  <div className="channel-icon-wrap"><AiOutlineEnvironment /></div>
                  <div>
                    <div className="channel-label">Location</div>
                    <div className="channel-val">{content.location || "Hyderabad, Telangana, India"}</div>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-wrap"><AiOutlineApartment /></div>
                  <div>
                    <div className="channel-label">Current Role & Org</div>
                    <div className="channel-val">Software Developer @ Centre for Good Governance</div>
                  </div>
                </div>

                <div className="channel-item">
                  <div className="channel-icon-wrap"><AiOutlineRead /></div>
                  <div>
                    <div className="channel-label">Education</div>
                    <div className="channel-val">B.Tech CSE, RGUKT Basar (CGPA: 8.4)</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-auto pt-4 border-top border-secondary">
                <div className="social-heading mb-3">Connect on Social</div>
                <div className="d-flex gap-2 flex-wrap">
                  {content.github && (
                    <a href={content.github} target="_blank" rel="noreferrer" className="contact-social-btn" aria-label="GitHub">
                      <AiFillGithub />
                    </a>
                  )}
                  {content.linkedin && (
                    <a href={content.linkedin} target="_blank" rel="noreferrer" className="contact-social-btn" aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </a>
                  )}
                  {content.twitter && (
                    <a href={content.twitter} target="_blank" rel="noreferrer" className="contact-social-btn" aria-label="Twitter">
                      <AiOutlineTwitter />
                    </a>
                  )}
                  {content.instagram && (
                    <a href={content.instagram} target="_blank" rel="noreferrer" className="contact-social-btn" aria-label="Instagram">
                      <AiFillInstagram />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Col>

          {/* Right Column: Contact Form */}
          <Col lg={7} md={12}>
            <div className="contact-form-card glass-panel">
              <h3 className="form-card-title mb-4">Send a Message</h3>

              <Form onSubmit={handleSubmit} noValidate>
                <Row className="g-3">
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name" className="modern-label">Your Name *</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        className="modern-input"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        invalid={!!errorData.name}
                      />
                      <FormFeedback>{errorData.name}</FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label for="email" className="modern-label">Email Address *</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        className="modern-input"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        invalid={!!errorData.email}
                      />
                      <FormFeedback>{errorData.email}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup className="mt-3">
                  <Label for="mobileNumber" className="modern-label">Phone Number (Optional)</Label>
                  <Input
                    type="text"
                    name="mobileNumber"
                    id="mobileNumber"
                    className="modern-input"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    invalid={!!errorData.mobileNumber}
                  />
                  <FormFeedback>{errorData.mobileNumber}</FormFeedback>
                </FormGroup>

                <FormGroup className="mt-3">
                  <Label for="message" className="modern-label">Your Message *</Label>
                  <Input
                    type="textarea"
                    name="message"
                    id="message"
                    rows={5}
                    className="modern-input textarea"
                    placeholder="Tell me about your project, idea, or role..."
                    value={formData.message}
                    onChange={handleChange}
                    invalid={!!errorData.message}
                  />
                  <FormFeedback>{errorData.message}</FormFeedback>
                </FormGroup>

                <Button
                  type="submit"
                  className="btn-modern-primary w-100 mt-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message <AiOutlineSend className="ms-2" />
                    </>
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
