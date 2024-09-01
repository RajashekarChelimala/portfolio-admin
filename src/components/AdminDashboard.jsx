import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { AiOutlineAppstore, AiOutlineFileText, AiOutlineProject, AiOutlineEdit, AiOutlinePlusCircle, AiOutlineFile } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import your custom CSS

const AdminDashboard = () => {
  return (
    <Container className="admin-dashboard">
      <Row className="justify-content-center mb-4">
        <Col md={8} lg={10}>
          <h1 className="text-center mb-4">Welcome to the Admin Dashboard</h1>
          <p className="text-center mb-4">Manage the application using the options below:</p>
          <Row>
            <Col sm="12" md="6" lg="3" className="mb-4">
              <Link to="/manage-services">
                <Card className="dashboard-card">
                  <CardBody>
                    <AiOutlineAppstore className="dashboard-card-icon" />
                    <CardTitle tag="h5">Manage Services</CardTitle>
                    <CardText>View and manage services offered by the application.</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col sm="12" md="6" lg="3" className="mb-4">
              <Link to="/posts">
                <Card className="dashboard-card">
                  <CardBody>
                    <AiOutlineFileText className="dashboard-card-icon" />
                    <CardTitle tag="h5">Manage Posts</CardTitle>
                    <CardText>Manage the posts and articles in the application.</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col sm="12" md="6" lg="3" className="mb-4">
              <Link to="/projects">
                <Card className="dashboard-card">
                  <CardBody>
                    <AiOutlineProject className="dashboard-card-icon" />
                    <CardTitle tag="h5">Manage Projects</CardTitle>
                    <CardText>Handle project details and updates.</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col sm="12" md="6" lg="3" className="mb-4">
              <Link to="/content">
                <Card className="dashboard-card">
                  <CardBody>
                    <AiOutlineEdit className="dashboard-card-icon" />
                    <CardTitle tag="h5">Manage Content</CardTitle>
                    <CardText>Edit and update application content.</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col sm="12" md="6" lg="3" className="mb-4">
              <Link to="/manage-todo">
                <Card className="dashboard-card">
                  <CardBody>
                    <AiOutlinePlusCircle className="dashboard-card-icon" />
                    <CardTitle tag="h5">Add To Do</CardTitle>
                    <CardText>Edit and update your own To Do.</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
            <Col sm="12" md="6" lg="3" className="mb-4">
              <Link to="/resume-requests">
                <Card className="dashboard-card">
                  <CardBody>
                    <AiOutlineFile className="dashboard-card-icon" />
                    <CardTitle tag="h5">Resume Requests</CardTitle>
                    <CardText>List of people who requested a resume.</CardText>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h2 className="text-center mb-4">Recent Activity</h2>
              <ul className="activity-feed">
                <li>Added new service: Web Hosting</li>
                <li>Updated post: How to use the Admin Dashboard</li>
                <li>Created a new project: Marketing Campaign</li>
                <li>Edited content: About Us page</li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
