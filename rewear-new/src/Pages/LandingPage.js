import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = () => {
  // Mock data for featured items
  const featuredItems = [
    { id: 1, title: "Designer Denim Jacket", category: "Jackets", size: "M" },
    { id: 2, title: "Vintage Summer Dress", category: "Dresses", size: "S" },
    { id: 3, title: "Leather Ankle Boots", category: "Footwear", size: "US 8" },
    { id: 4, title: "Wool Winter Coat", category: "Coats", size: "L" },
    { id: 5, title: "Silk Evening Blouse", category: "Tops", size: "XS" },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <Container className="text-center text-white">
          <h1 className="display-4 fw-bold mb-4">Swap Style, Save the Planet</h1>
          <p className="lead mb-5">Exchange clothing with your community to reduce waste and refresh your wardrobe sustainably</p>
          <div className="cta-buttons">
            <Button as={Link} to="/register" variant="primary" size="lg" className="me-2 mb-2">
              Join Free <i className="bi-arrow-right ms-2"></i>
            </Button>
            <Button as={Link} to="/browse" variant="outline-light" size="lg" className="mb-2">
              Browse Items
            </Button>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="how-it-works py-5">
        <Container>
          <h2 className="text-center mb-5">How ReWear Works</h2>
          <Row className="g-4">
            <Col md={4} className="text-center">
              <div className="step-icon mx-auto mb-4">
                <i className="bi-person-plus fs-1"></i>
              </div>
              <h4 className="mb-3">1. Create Account</h4>
              <p className="text-muted">Sign up in seconds and set up your profile</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="step-icon mx-auto mb-4">
                <i className="bi-cloud-upload fs-1"></i>
              </div>
              <h4 className="mb-3">2. List Items</h4>
              <p className="text-muted">Upload clothes you no longer wear</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="step-icon mx-auto mb-4">
                <i className="bi-arrow-repeat fs-1"></i>
              </div>
              <h4 className="mb-3">3. Swap or Redeem</h4>
              <p className="text-muted">Exchange items directly or use points</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Items */}
      <section className="featured-items py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Recently Added Items</h2>
          <Row className="g-4 justify-content-center">
            {featuredItems.map((item) => (
              <Col key={item.id} md={6} lg={4} xl={3} className="text-center">
                <div className="item-card p-3 bg-white rounded shadow-sm">
                  <div className="placeholder-image mb-3"></div>
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="text-muted small mb-0">{item.category} | {item.size}</p>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button as={Link} to="/browse" variant="outline-primary">
              View All Items
            </Button>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="benefits py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <div className="benefits-image rounded"></div>
            </Col>
            <Col md={6}>
              <h2 className="mb-4">Why Choose ReWear?</h2>
              <ul className="benefits-list">
                <li>
                  <i className="bi-check-circle-fill text-success me-2"></i>
                  Reduce textile waste and environmental impact
                </li>
                <li>
                  <i className="bi-check-circle-fill text-success me-2"></i>
                  Refresh your wardrobe without spending money
                </li>
                <li>
                  <i className="bi-check-circle-fill text-success me-2"></i>
                  Earn points for items you contribute
                </li>
                <li>
                  <i className="bi-check-circle-fill text-success me-2"></i>
                  Connect with a community of sustainable fashion lovers
                </li>
              </ul>
              <Button as={Link} to="/about" variant="outline-dark" className="mt-3">
                Learn More About Our Mission
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5 bg-dark text-white">
        <Container>
          <h2 className="text-center mb-5">What Our Community Says</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="testimonial p-4 rounded">
                <p className="fst-italic">"I've refreshed my entire wardrobe without spending a dime! ReWear is revolutionary."</p>
                <p className="mb-0 fw-bold">- Sarah K.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial p-4 rounded">
                <p className="fst-italic">"The point system makes it so easy to get exactly what I want. Love this platform!"</p>
                <p className="mb-0 fw-bold">- Michael T.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial p-4 rounded">
                <p className="fst-italic">"Finally a sustainable solution for clothes I no longer wear. Reduced my waste significantly."</p>
                <p className="mb-0 fw-bold">- Priya M.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="final-cta py-5 text-center bg-light">
        <Container>
          <h2 className="mb-4">Ready to Join the Fashion Revolution?</h2>
          <p className="lead mb-5">Sign up today and get 50 bonus points to start swapping!</p>
          <Button as={Link} to="/register" variant="primary" size="lg" className="px-5 py-3">
            Get Started Free
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;