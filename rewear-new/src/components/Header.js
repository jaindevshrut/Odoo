import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged in user
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <i className="bi-recycle me-2"></i>ReWear
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/browse">Browse Items</Nav.Link>
            {user && (
              <>
                <Nav.Link as={Link} to="/dashboard">My Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/add-item">
                  <i className="bi-plus-circle me-1"></i>Add Item
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Item className="d-flex align-items-center me-3">
                  <span className="text-warning me-1">
                    <i className="bi-coin"></i>
                  </span>
                  <Badge bg="warning" text="dark">{user.points}</Badge>
                </Nav.Item>
                <NavDropdown 
                  title={
                    <span>
                      <i className="bi-person-circle me-1"></i>
                      {user.name.split(' ')[0]}
                    </span>
                  } 
                  id="user-nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/dashboard">
                    <i className="bi-speedometer2 me-2"></i>Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                    <i className="bi-person me-2"></i>Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">
                    <i className="bi-gear me-2"></i>Settings
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {user.email === 'admin@rewear.com' && (
                    <>
                      <NavDropdown.Item as={Link} to="/admin">
                        <i className="bi-shield-check me-2"></i>Admin Panel
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </>
                  )}
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi-box-arrow-right me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Button as={Link} to="/register" variant="outline-light" className="ms-2">
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;