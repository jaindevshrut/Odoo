import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setAlertMessage('Passwords do not match!');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    if (!formData.agreeTerms) {
      setAlertMessage('Please agree to the terms and conditions.');
      setAlertVariant('danger');
      setShowAlert(true);
      return;
    }

    // Mock registration - in real app, this would make API call
    localStorage.setItem('user', JSON.stringify({
      id: 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      points: 50 // Welcome bonus
    }));

    setAlertMessage('Registration successful! Welcome to ReWear! You\'ve earned 50 welcome points.');
    setAlertVariant('success');
    setShowAlert(true);

    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="mb-2">Join ReWear</h2>
                <p className="text-muted">Create your account and start swapping today</p>
              </div>

              {showAlert && (
                <Alert variant={alertVariant}>
                  {alertMessage}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

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
                    placeholder="Create a password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    label={
                      <span>
                        I agree to the{' '}
                        <Link to="/terms" className="text-decoration-none">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-decoration-none">
                          Privacy Policy
                        </Link>
                      </span>
                    }
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 mb-3">
                  Create Account
                </Button>
              </Form>

              <div className="text-center">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="text-decoration-none">
                  Sign in here
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
