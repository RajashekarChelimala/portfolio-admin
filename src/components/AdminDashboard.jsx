import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { AiOutlineAppstore, AiOutlineFileText, AiOutlineProject, AiOutlineEdit, AiOutlinePlusCircle, AiOutlineFile } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Import your custom CSS
import { GiSkills } from "react-icons/gi";

const AdminDashboard = () => {

  const dashboardItems = [
    { path: '/manage-services', icon: <AiOutlineAppstore />, title: 'Manage Services', text: 'View and manage services offered by the application.' },
    { path: '/manage-posts', icon: <AiOutlineFileText />, title: 'Manage Posts', text: 'Manage the posts and articles in the application.' },
    { path: '/manage-projects', icon: <AiOutlineProject />, title: 'Manage Projects', text: 'Handle project details and updates.' },
    { path: '/manage-skills', icon: <GiSkills />, title: 'Manage Skills', text: 'Handle skill details and updates.' },
    { path: '/content', icon: <AiOutlineEdit />, title: 'Manage Content', text: 'Edit and update application content.' },
    { path: '/manage-todo', icon: <AiOutlinePlusCircle />, title: 'Add To Do', text: 'Edit and update your own To Do.' },
    { path: '/contact-requests', icon: <AiOutlineFile />, title: 'Contact Requests', text: 'List of people who requested to contact.' },
  ];

  return (
    <Container className="admin-dashboard" data-aos="fade-up">
      <Row className="justify-content-center mb-4">
        <Col md={8} lg={10}>
          <h1 className="text-center mb-4" data-aos="fade-down">Welcome to the Admin Dashboard</h1>
          <p className="text-center mb-4" data-aos="fade-down">Manage the application using the options below:</p>
          <Row>
            {dashboardItems.map((item, index) => (
              <Col sm="12" md="6" lg="3" className="mb-4" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                <Link to={item.path}>
                  <Card className="dashboard-card">
                    <CardBody>
                      <div className="dashboard-card-icon">{item.icon}</div>
                      <CardTitle tag="h5">{item.title}</CardTitle>
                      <CardText>{item.text}</CardText>
                    </CardBody>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <Row className="mt-5">
            <Col>
              <h2 className="text-center mb-4" data-aos="fade-up">Recent Activity</h2>
              <ul className="activity-feed" data-aos="fade-up">
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
