import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Get user data from localStorage (mock data)
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Mock data for user's items and swaps
  const userItems = [
    {
      id: 1,
      title: "Designer Denim Jacket",
      category: "Jackets",
      size: "M",
      condition: "Good",
      status: "Available",
      views: 23,
      dateAdded: "2025-01-10"
    },
    {
      id: 2,
      title: "Vintage Summer Dress",
      category: "Dresses",
      size: "S",
      condition: "Excellent",
      status: "Swapped",
      views: 45,
      dateAdded: "2025-01-08"
    },
    {
      id: 3,
      title: "Leather Ankle Boots",
      category: "Footwear",
      size: "US 8",
      condition: "Very Good",
      status: "Available",
      views: 12,
      dateAdded: "2025-01-12"
    }
  ];

  const swapHistory = [
    {
      id: 1,
      type: "Swap Request",
      item: "Designer Denim Jacket",
      requestedItem: "Wool Winter Coat",
      status: "Pending",
      date: "2025-01-12",
      partner: "Sarah M."
    },
    {
      id: 2,
      type: "Points Redemption",
      item: "Silk Evening Blouse",
      pointsUsed: 85,
      status: "Completed",
      date: "2025-01-10",
      partner: "ReWear Store"
    },
    {
      id: 3,
      type: "Swap Completed",
      item: "Vintage Summer Dress",
      receivedItem: "Cotton T-Shirt",
      status: "Completed",
      date: "2025-01-08",
      partner: "Mike T."
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      'Available': 'success',
      'Swapped': 'secondary',
      'Pending': 'warning',
      'Completed': 'primary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h3>Please log in to view your dashboard</h3>
        <Button as={Link} to="/login" variant="primary" className="mt-3">
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header Section */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-1">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-muted mb-0">Manage your items and track your swaps</p>
            </div>
            <Button as={Link} to="/add-item" variant="primary">
              <i className="bi-plus-circle me-2"></i>Add New Item
            </Button>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-6 text-primary mb-2">
                <i className="bi-coin"></i>
              </div>
              <h3 className="mb-1">{user.points}</h3>
              <p className="text-muted mb-0">Points Balance</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-6 text-success mb-2">
                <i className="bi-box"></i>
              </div>
              <h3 className="mb-1">{userItems.length}</h3>
              <p className="text-muted mb-0">Items Listed</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-6 text-info mb-2">
                <i className="bi-arrow-repeat"></i>
              </div>
              <h3 className="mb-1">{swapHistory.filter(s => s.status === 'Completed').length}</h3>
              <p className="text-muted mb-0">Completed Swaps</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-6 text-warning mb-2">
                <i className="bi-eye"></i>
              </div>
              <h3 className="mb-1">{userItems.reduce((total, item) => total + item.views, 0)}</h3>
              <p className="text-muted mb-0">Total Views</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabs Section */}
      <Card>
        <Card.Body>
          <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
            <Tab eventKey="overview" title="My Items">
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Your Listed Items</h5>
                <Button as={Link} to="/add-item" variant="outline-primary" size="sm">
                  <i className="bi-plus me-1"></i>Add Item
                </Button>
              </div>
              
              {userItems.length > 0 ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Category</th>
                      <th>Size</th>
                      <th>Condition</th>
                      <th>Status</th>
                      <th>Views</th>
                      <th>Date Added</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <Link to={`/item/${item.id}`} className="text-decoration-none fw-medium">
                            {item.title}
                          </Link>
                        </td>
                        <td>{item.category}</td>
                        <td>{item.size}</td>
                        <td>{item.condition}</td>
                        <td>{getStatusBadge(item.status)}</td>
                        <td>{item.views}</td>
                        <td>{new Date(item.dateAdded).toLocaleDateString()}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Button variant="outline-primary" size="sm">
                              <i className="bi-pencil"></i>
                            </Button>
                            <Button variant="outline-danger" size="sm">
                              <i className="bi-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-5">
                  <div className="display-1 text-muted mb-3">
                    <i className="bi-box"></i>
                  </div>
                  <h5 className="mb-3">No items listed yet</h5>
                  <p className="text-muted mb-4">Start by adding your first item to the platform</p>
                  <Button as={Link} to="/add-item" variant="primary">
                    Add Your First Item
                  </Button>
                </div>
              )}
            </Tab>

            <Tab eventKey="swaps" title="Swap History">
              <div className="mb-3">
                <h5 className="mb-0">Recent Activity</h5>
              </div>
              
              {swapHistory.length > 0 ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Item</th>
                      <th>Details</th>
                      <th>Partner</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {swapHistory.map((swap) => (
                      <tr key={swap.id}>
                        <td>
                          <Badge bg="light" text="dark">{swap.type}</Badge>
                        </td>
                        <td className="fw-medium">{swap.item}</td>
                        <td>
                          {swap.requestedItem && `→ ${swap.requestedItem}`}
                          {swap.receivedItem && `← ${swap.receivedItem}`}
                          {swap.pointsUsed && `${swap.pointsUsed} points`}
                        </td>
                        <td>{swap.partner}</td>
                        <td>{getStatusBadge(swap.status)}</td>
                        <td>{new Date(swap.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-5">
                  <div className="display-1 text-muted mb-3">
                    <i className="bi-arrow-repeat"></i>
                  </div>
                  <h5 className="mb-3">No swap history yet</h5>
                  <p className="text-muted mb-4">Start browsing items to make your first swap</p>
                  <Button as={Link} to="/browse" variant="primary">
                    Browse Items
                  </Button>
                </div>
              )}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
