import React, { useContext, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import './Login.css'; // Import your custom CSS if needed
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext); // Destructure the `login` function from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Login");
      await login(username, password); // Use the `login` function from context
      navigate('/admin-dashboard'); // Redirect to Admin Dashboard on successful login
    } catch (error) {
      console.error("Login failed", error); // Log the error
    }
  };

  return (
    <Container className="login-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form className="login-form" onSubmit={handleLogin}>
            <h2 className="login-title">Admin Login</h2>
            <FormGroup>
              <Label for="username" className="login-label">Username</Label>
              <InputGroup>
                <InputGroupText>
                  <AiOutlineUser />
                </InputGroupText>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="password" className="login-label">Password</Label>
              <InputGroup>
                <InputGroupText>
                  <AiOutlineLock />
                </InputGroupText>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button type="submit" color="primary" className="login-button">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
