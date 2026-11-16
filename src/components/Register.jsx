import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineKey,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineSafetyCertificate,
  AiOutlineAlert
} from "react-icons/ai";
import { AuthContext } from "../context/AuthProvider";
import { showSuccessToast, showErrorToast } from "../ui-elements/toastConfig";
import "./Register.css";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!username.trim()) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!adminKey) errors.adminKey = "Admin key is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setLoading(true);
    try {
      const result = await register(username.trim(), password, adminKey.trim());
      if (result && result.success) {
        showSuccessToast("Administrator account successfully created! Please sign in.");
        navigate("/admin-login");
      } else {
        const msg = result?.message || "Registration failed. Please verify your Admin Key.";
        setErrorMsg(msg);
        showErrorToast(msg);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration error. Verification failed.";
      setErrorMsg(msg);
      showErrorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="ambient-glow-cyan" style={{ top: "15%", left: "10%" }} />
      <div className="ambient-glow-purple" style={{ bottom: "15%", right: "10%" }} />

      <Container>
        <Row className="justify-content-center">
          <Col xl={5} lg={6} md={8} sm={11} xs={12}>
            <div className="register-card-container glass-panel">
              {/* Back Link */}
              <div className="register-top-nav">
                <Link to="/" className="back-to-site-link">
                  <AiOutlineArrowLeft className="me-1" /> Back to Portfolio
                </Link>
                <span className="secure-badge">
                  <AiOutlineSafetyCertificate className="me-1 text-success" /> Admin Enrollment
                </span>
              </div>

              {/* Header Branding */}
              <div className="register-header text-center">
                <div className="register-brand-icon">
                  <AiOutlineKey />
                </div>
                <h1 className="register-heading">Admin Setup</h1>
                <p className="register-subtext">
                  Enroll the primary administrator account using your secret server-side Admin Key.
                </p>
              </div>

              {/* Inline Error Banner */}
              {errorMsg && (
                <div className="register-error-banner" role="alert">
                  <AiOutlineAlert className="error-icon" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <Form onSubmit={handleRegister} noValidate className="register-form-inner">
                {/* Username */}
                <FormGroup className="register-form-group">
                  <Label for="username" className="register-field-label">
                    Administrator Username
                  </Label>
                  <div className={`register-input-wrap ${fieldErrors.username ? "has-error" : ""}`}>
                    <span className="input-prefix-icon">
                      <AiOutlineUser />
                    </span>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="e.g. rajashekar"
                      className="register-text-input"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (fieldErrors.username) {
                          setFieldErrors((prev) => ({ ...prev, username: "" }));
                        }
                      }}
                      autoComplete="username"
                      disabled={loading}
                    />
                  </div>
                  {fieldErrors.username && (
                    <span className="register-inline-error">{fieldErrors.username}</span>
                  )}
                </FormGroup>

                {/* Password */}
                <FormGroup className="register-form-group">
                  <Label for="password" className="register-field-label">
                    Master Password
                  </Label>
                  <div className={`register-input-wrap ${fieldErrors.password ? "has-error" : ""}`}>
                    <span className="input-prefix-icon">
                      <AiOutlineLock />
                    </span>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Create a strong password"
                      className="register-text-input"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password) {
                          setFieldErrors((prev) => ({ ...prev, password: "" }));
                        }
                      }}
                      autoComplete="new-password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="toggle-password-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <span className="register-inline-error">{fieldErrors.password}</span>
                  )}
                </FormGroup>

                {/* Admin Key */}
                <FormGroup className="register-form-group">
                  <Label for="adminKey" className="register-field-label">
                    Server Admin Key
                  </Label>
                  <div className={`register-input-wrap ${fieldErrors.adminKey ? "has-error" : ""}`}>
                    <span className="input-prefix-icon">
                      <AiOutlineKey />
                    </span>
                    <Input
                      type={showKey ? "text" : "password"}
                      name="adminKey"
                      id="adminKey"
                      placeholder="Enter ADMIN_KEY from server .env"
                      className="register-text-input"
                      value={adminKey}
                      onChange={(e) => {
                        setAdminKey(e.target.value);
                        if (fieldErrors.adminKey) {
                          setFieldErrors((prev) => ({ ...prev, adminKey: "" }));
                        }
                      }}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="toggle-password-btn"
                      onClick={() => setShowKey(!showKey)}
                      aria-label={showKey ? "Hide key" : "Show key"}
                      tabIndex={-1}
                    >
                      {showKey ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </button>
                  </div>
                  {fieldErrors.adminKey && (
                    <span className="register-inline-error">{fieldErrors.adminKey}</span>
                  )}
                </FormGroup>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-register-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                      Creating Account...
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      Create Administrator Account <AiOutlineArrowRight />
                    </span>
                  )}
                </button>
              </Form>

              {/* Already have account link */}
              <div className="register-card-footer text-center">
                <p className="login-switch-text">
                  Already have an account?{" "}
                  <Link to="/admin-login" className="login-link">
                    Sign in to Console
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;