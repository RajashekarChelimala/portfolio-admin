import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineSafetyCertificate,
  AiOutlineAlert
} from "react-icons/ai";
import { AuthContext } from "../context/AuthProvider";
import { showSuccessToast, showErrorToast } from "../ui-elements/toastConfig";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setLoading(true);
    try {
      const result = await login(username.trim(), password);
      if (result && result.success) {
        showSuccessToast("Welcome back, Administrator!");
        navigate("/admin-dashboard");
      } else {
        const msg = result?.message || "Invalid credentials. Please verify username and password.";
        setErrorMsg(msg);
        showErrorToast(msg);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Authentication error. Please try again.";
      setErrorMsg(msg);
      showErrorToast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="ambient-glow-cyan" style={{ top: "15%", left: "10%" }} />
      <div className="ambient-glow-purple" style={{ bottom: "15%", right: "10%" }} />

      <Container>
        <Row className="justify-content-center">
          <Col xl={5} lg={6} md={8} sm={11} xs={12}>
            <div className="login-card-container glass-panel">
              {/* Back Link */}
              <div className="login-top-nav">
                <Link to="/" className="back-to-site-link">
                  <AiOutlineArrowLeft className="me-1" /> Back to Portfolio
                </Link>
                <span className="secure-badge">
                  <AiOutlineSafetyCertificate className="me-1 text-success" /> Encrypted Portal
                </span>
              </div>

              {/* Header Branding */}
              <div className="login-header text-center">
                <div className="login-brand-icon">
                  <AiOutlineLock />
                </div>
                <h1 className="login-heading">Admin Portal</h1>
                <p className="login-subtext">
                  Sign in with your administrative credentials to manage portfolio content, project showcases, and articles.
                </p>
              </div>

              {/* Inline Error Banner */}
              {errorMsg && (
                <div className="login-error-banner" role="alert">
                  <AiOutlineAlert className="error-icon" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <Form onSubmit={handleLogin} noValidate className="login-form-inner">
                {/* Username */}
                <FormGroup className="login-form-group">
                  <Label for="username" className="login-field-label">
                    Username
                  </Label>
                  <div className={`login-input-wrap ${fieldErrors.username ? "has-error" : ""}`}>
                    <span className="input-prefix-icon">
                      <AiOutlineUser />
                    </span>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter admin username"
                      className="login-text-input"
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
                    <span className="login-inline-error">{fieldErrors.username}</span>
                  )}
                </FormGroup>

                {/* Password */}
                <FormGroup className="login-form-group">
                  <Label for="password" className="login-field-label">
                    Password
                  </Label>
                  <div className={`login-input-wrap ${fieldErrors.password ? "has-error" : ""}`}>
                    <span className="input-prefix-icon">
                      <AiOutlineLock />
                    </span>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="login-text-input"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password) {
                          setFieldErrors((prev) => ({ ...prev, password: "" }));
                        }
                      }}
                      autoComplete="current-password"
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
                    <span className="login-inline-error">{fieldErrors.password}</span>
                  )}
                </FormGroup>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-login-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      Sign In to Console <AiOutlineArrowRight />
                    </span>
                  )}
                </button>
              </Form>

              {/* Footer Note */}
              <div className="login-card-footer text-center">
                <p className="footer-security-note">
                  Protected System • Unauthorized access attempts are monitored and recorded.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;