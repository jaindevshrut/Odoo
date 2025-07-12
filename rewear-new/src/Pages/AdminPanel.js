import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form, Alert, Tabs, Tab } from 'react-bootstrap';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [moderationNote, setModerationNote] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  // Mock data for pending items
  const [pendingItems, setPendingItems] = useState([
    {
      id: 1,
      title: "Designer Denim Jacket",
      uploader: "Sarah M.",
      category: "Jackets",
      condition: "Excellent",
      dateSubmitted: "2025-01-12",
      status: "pending",
      flagged: false,
      reason: ""
    },
    {
      id: 2,
      title: "Vintage Summer Dress",
      uploader: "Emma K.",
      category: "Dresses",
      condition: "Very Good",
      dateSubmitted: "2025-01-11",
      status: "pending",
      flagged: true,
      reason: "Inappropriate image reported"
    },
    {
      id: 3,
      title: "Leather Ankle Boots",
      uploader: "Mike T.",
      category: "Footwear",
      condition: "Good",
      dateSubmitted: "2025-01-10",
      status: "pending",
      flagged: false,
      reason: ""
    }
  ]);

  const [moderatedItems, setModeratedItems] = useState([
    {
      id: 4,
      title: "Wool Winter Coat",
      uploader: "Lisa R.",
      category: "Coats",
      condition: "Excellent",
      dateSubmitted: "2025-01-09",
      status: "approved",
      moderatedDate: "2025-01-09",
      moderator: "Admin",
      note: "Approved - meets all guidelines"
    },
    {
      id: 5,
      title: "Fake Designer Bag",
      uploader: "John D.",
      category: "Accessories",
      condition: "Like New",
      dateSubmitted: "2025-01-08",
      status: "rejected",
      moderatedDate: "2025-01-08",
      moderator: "Admin",
      note: "Rejected - Counterfeit item"
    }
  ]);

  const [reportedItems, setReportedItems] = useState([
    {
      id: 6,
      title: "Cotton Casual T-Shirt",
      uploader: "Anna P.",
      category: "Tops",
      reportedBy: "User123",
      reason: "Item condition not as described",
      dateReported: "2025-01-11",
      status: "under_review"
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah M.",
      email: "sarah@example.com",
      joinDate: "2024-12-15",
      totalItems: 12,
      totalSwaps: 23,
      status: "active",
      warnings: 0
    },
    {
      id: 2,
      name: "John D.",
      email: "john@example.com",
      joinDate: "2024-11-20",
      totalItems: 3,
      totalSwaps: 1,
      status: "warned",
      warnings: 2
    }
  ]);

  const handleModerate = (item, action) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const submitModeration = (action) => {
    if (!selectedItem) return;

    const updatedItem = {
      ...selectedItem,
      status: action,
      moderatedDate: new Date().toISOString().split('T')[0],
      moderator: "Admin",
      note: moderationNote || `${action === 'approved' ? 'Approved' : 'Rejected'} by admin`
    };

    // Remove from pending
    setPendingItems(prev => prev.filter(item => item.id !== selectedItem.id));
    
    // Add to moderated
    setModeratedItems(prev => [updatedItem, ...prev]);

    setAlert({
      show: true,
      message: `Item ${action} successfully!`,
      variant: action === 'approved' ? 'success' : 'warning'
    });

    setShowModal(false);
    setModerationNote('');
    setSelectedItem(null);
  };

  const getStatusBadge = (status) => {
    const variants = {
      'pending': 'warning',
      'approved': 'success',
      'rejected': 'danger',
      'under_review': 'info',
      'active': 'success',
      'warned': 'warning',
      'suspended': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status.replace('_', ' ')}</Badge>;
  };

  const stats = {
    totalItems: pendingItems.length + moderatedItems.length + reportedItems.length,
    pendingItems: pendingItems.length,
    approvedToday: moderatedItems.filter(item => 
      item.status === 'approved' && 
      item.moderatedDate === new Date().toISOString().split('T')[0]
    ).length,
    rejectedToday: moderatedItems.filter(item => 
      item.status === 'rejected' && 
      item.moderatedDate === new Date().toISOString().split('T')[0]
    ).length,
    totalUsers: users.length,
    activeUsers: users.filter(user => user.status === 'active').length,
    reportedItems: reportedItems.length
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-1">Admin Panel</h1>
              <p className="text-muted mb-0">Moderate content and manage the ReWear platform</p>
            </div>
            <Badge bg="primary" className="fs-6">Admin</Badge>
          </div>
        </Col>
      </Row>

      {alert.show && (
        <Alert 
          variant={alert.variant} 
          onClose={() => setAlert({ ...alert, show: false })} 
          dismissible
          className="mb-4"
        >
          {alert.message}
        </Alert>
      )}

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-6 text-warning mb-2">
                <i className="bi-clock"></i>
              </div>
              <h3 className="mb-1">{stats.pendingItems}</h3>
              <p className="text-muted mb-0">Pending Review</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-6 text-success mb-2">
                <i className="bi-check-circle"></i>
              </div>
              <h3 className="mb-1">{stats.approvedToday}</h3>
              <p className="text-muted mb-0">Approved Today</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-6 text-danger mb-2">
                <i className="bi-flag"></i>
              </div>
              <h3 className="mb-1">{stats.reportedItems}</h3>
              <p className="text-muted mb-0">Reported Items</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <div className="display-6 text-info mb-2">
                <i className="bi-people"></i>
              </div>
              <h3 className="mb-1">{stats.activeUsers}</h3>
              <p className="text-muted mb-0">Active Users</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        <Card.Body>
          <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
            {/* Pending Items */}
            <Tab eventKey="pending" title={`Pending Review (${stats.pendingItems})`}>
              <div className="mb-3">
                <h5 className="mb-0">Items Awaiting Moderation</h5>
                <small className="text-muted">Review and approve/reject user submissions</small>
              </div>
              
              {pendingItems.length > 0 ? (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Uploader</th>
                      <th>Category</th>
                      <th>Condition</th>
                      <th>Date Submitted</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingItems.map((item) => (
                      <tr key={item.id} className={item.flagged ? 'table-warning' : ''}>
                        <td>
                          <div className="fw-medium">{item.title}</div>
                          {item.flagged && (
                            <small className="text-danger">
                              <i className="bi-flag me-1"></i>Flagged: {item.reason}
                            </small>
                          )}
                        </td>
                        <td>{item.uploader}</td>
                        <td>{item.category}</td>
                        <td>{item.condition}</td>
                        <td>{new Date(item.dateSubmitted).toLocaleDateString()}</td>
                        <td>{getStatusBadge(item.status)}</td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Button 
                              variant="success" 
                              size="sm"
                              onClick={() => handleModerate(item, 'approved')}
                            >
                              <i className="bi-check"></i>
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleModerate(item, 'rejected')}
                            >
                              <i className="bi-x"></i>
                            </Button>
                            <Button variant="outline-primary" size="sm">
                              <i className="bi-eye"></i>
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
                    <i className="bi-check-circle"></i>
                  </div>
                  <h5 className="mb-3">No pending items</h5>
                  <p className="text-muted">All items have been reviewed</p>
                </div>
              )}
            </Tab>

            {/* Moderated Items */}
            <Tab eventKey="moderated" title="Moderated Items">
              <div className="mb-3">
                <h5 className="mb-0">Previously Moderated Items</h5>
                <small className="text-muted">History of approved and rejected items</small>
              </div>
              
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Uploader</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Moderated Date</th>
                    <th>Moderator</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {moderatedItems.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">{item.title}</td>
                      <td>{item.uploader}</td>
                      <td>{item.category}</td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td>{new Date(item.moderatedDate).toLocaleDateString()}</td>
                      <td>{item.moderator}</td>
                      <td>
                        <small className="text-muted">{item.note}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            {/* Reported Items */}
            <Tab eventKey="reported" title={`Reported Items (${stats.reportedItems})`}>
              <div className="mb-3">
                <h5 className="mb-0">User Reports</h5>
                <small className="text-muted">Items reported by community members</small>
              </div>
              
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Uploader</th>
                    <th>Reported By</th>
                    <th>Reason</th>
                    <th>Date Reported</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reportedItems.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-medium">{item.title}</td>
                      <td>{item.uploader}</td>
                      <td>{item.reportedBy}</td>
                      <td>{item.reason}</td>
                      <td>{new Date(item.dateReported).toLocaleDateString()}</td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Button variant="primary" size="sm">
                            <i className="bi-eye"></i>
                          </Button>
                          <Button variant="success" size="sm">
                            <i className="bi-check"></i>
                          </Button>
                          <Button variant="danger" size="sm">
                            <i className="bi-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            {/* User Management */}
            <Tab eventKey="users" title="User Management">
              <div className="mb-3">
                <h5 className="mb-0">User Management</h5>
                <small className="text-muted">Monitor and manage user accounts</small>
              </div>
              
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Join Date</th>
                    <th>Items Listed</th>
                    <th>Total Swaps</th>
                    <th>Warnings</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="fw-medium">{user.name}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                      <td>{user.totalItems}</td>
                      <td>{user.totalSwaps}</td>
                      <td>
                        {user.warnings > 0 ? (
                          <Badge bg="warning">{user.warnings}</Badge>
                        ) : (
                          <span className="text-muted">0</span>
                        )}
                      </td>
                      <td>{getStatusBadge(user.status)}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Button variant="outline-primary" size="sm">
                            <i className="bi-eye"></i>
                          </Button>
                          <Button variant="outline-warning" size="sm">
                            <i className="bi-exclamation-triangle"></i>
                          </Button>
                          <Button variant="outline-danger" size="sm">
                            <i className="bi-ban"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      {/* Moderation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem && selectedItem.status === 'approved' ? 'Approve' : 'Reject'} Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <div className="mb-3">
                <strong>Item:</strong> {selectedItem.title}<br />
                <strong>Uploader:</strong> {selectedItem.uploader}<br />
                <strong>Category:</strong> {selectedItem.category}
              </div>
              
              <Form.Group>
                <Form.Label>Moderation Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={moderationNote}
                  onChange={(e) => setModerationNote(e.target.value)}
                  placeholder="Add a note about your decision..."
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={() => submitModeration('approved')}
          >
            Approve
          </Button>
          <Button 
            variant="danger" 
            onClick={() => submitModeration('rejected')}
          >
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
