import React, { useState, useContext } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, InputGroup, InputGroupText } from 'reactstrap';
import { AiOutlineUser, AiOutlineLock, AiOutlineKey } from 'react-icons/ai';
import './Register.css'; // Import your custom CSS if needed
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext); // Destructure the `register` function from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Registering");
      await register(username, password, adminKey); // Use the `register` function from context
    } catch (error) {
      console.error("Registration failed", error); // Log the error
    }
  };

  return (
    <Container className="register-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Form className="register-form" onSubmit={handleRegister}>
            <h2 className="register-title">Admin Registration</h2>
            <FormGroup>
              <Label for="username" className="register-label">Username</Label>
              <InputGroup>
                <InputGroupText>
                  <AiOutlineUser />
                </InputGroupText>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  className="register-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="password" className="register-label">Password</Label>
              <InputGroup>
                <InputGroupText>
                  <AiOutlineLock />
                </InputGroupText>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="register-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label for="adminKey" className="register-label">Admin Key</Label>
              <InputGroup>
                <InputGroupText>
                  <AiOutlineKey />
                </InputGroupText>
                <Input
                  type="text"
                  name="adminKey"
                  id="adminKey"
                  placeholder="Enter the admin key"
                  className="register-input"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <Button type="submit" color="primary" className="register-button">Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
