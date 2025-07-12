import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app, this would make API call
    if (formData.email && formData.password) {
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: 'John Doe',
        email: formData.email,
        points: 125
      }));
      setShowAlert(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="mb-2">Welcome Back</h2>
                <p className="text-muted">Sign in to your ReWear account</p>
              </div>

              {showAlert && (
                <Alert variant="success">
                  Login successful! Redirecting to dashboard...
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" variant="primary" className="w-100 mb-3">
                  Sign In
                </Button>
              </Form>

              <div className="text-center">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register" className="text-decoration-none">
                  Sign up here
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
