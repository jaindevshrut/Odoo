import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // ADD THIS IMPORT

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>ReWear</h5>
            <p>Sustainable fashion through community clothing exchange.</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/browse" className="text-white">Browse Items</Link></li>
              <li><Link to="/about" className="text-white">About Us</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><i className="bi-envelope me-2"></i>contact@rewear.com</li>
              <li><i className="bi-geo-alt me-2"></i>New York, NY</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-4 bg-light" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} ReWear. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;