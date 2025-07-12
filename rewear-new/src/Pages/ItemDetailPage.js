import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert } from 'react-bootstrap';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  useEffect(() => {
    // Get user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Mock item data - in real app, this would fetch from API
    const mockItem = {
      id: parseInt(id),
      title: "Designer Denim Jacket",
      description: "This vintage Levi's denim jacket is in excellent condition with minimal signs of wear. Features classic button closure, chest pockets, and that perfectly broken-in feel that only comes with time. Perfect for layering or wearing as a statement piece. Originally purchased for $180, this jacket has been gently worn and cared for.",
      category: "Jackets",
      type: "Casual",
      size: "M",
      condition: "Excellent",
      points: 85,
      uploader: {
        name: "Sarah M.",
        location: "New York, NY",
        rating: 4.8,
        totalSwaps: 23
      },
      dateAdded: "2025-01-12",
      images: ["jacket1.jpg", "jacket2.jpg", "jacket3.jpg"],
      tags: ["vintage", "denim", "casual", "levi's"],
      measurements: {
        chest: "42 inches",
        length: "25 inches",
        sleeve: "24 inches"
      },
      material: "100% Cotton Denim",
      careInstructions: "Machine wash cold, hang dry",
      originalPrice: "$180",
      reasonForSwapping: "Doesn't fit my style anymore",
      availability: "Available"
    };
    setItem(mockItem);
  }, [id]);

  // Mock user's items for swap
  const userItems = [
    { id: 1, title: "Wool Winter Coat", category: "Coats" },
    { id: 2, title: "Leather Ankle Boots", category: "Footwear" },
    { id: 3, title: "Silk Evening Blouse", category: "Tops" }
  ];

  const handleSwapRequest = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowSwapModal(true);
  };

  const handleRedeem = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.points < item.points) {
      setAlert({
        show: true,
        message: `You need ${item.points - user.points} more points to redeem this item.`,
        variant: 'warning'
      });
      return;
    }
    setShowRedeemModal(true);
  };

  const submitSwapRequest = () => {
    // Mock API call
    setAlert({
      show: true,
      message: 'Swap request sent successfully! The owner will be notified.',
      variant: 'success'
    });
    setShowSwapModal(false);
    setSwapMessage('');
    setSelectedItem('');
  };

  const confirmRedeem = () => {
    // Mock API call - deduct points
    const updatedUser = { ...user, points: user.points - item.points };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    setAlert({
      show: true,
      message: `Successfully redeemed ${item.title} for ${item.points} points!`,
      variant: 'success'
    });
    setShowRedeemModal(false);
  };

  const getConditionColor = (condition) => {
    const colors = {
      'Like New': 'success',
      'Excellent': 'primary',
      'Very Good': 'info',
      'Good': 'warning',
      'Fair': 'secondary'
    };
    return colors[condition] || 'secondary';
  };

  if (!item) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
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

      <Row>
        {/* Image Gallery */}
        <Col lg={6}>
          <Card className="mb-4">
            <div className="position-relative">
              <div className="item-main-image bg-light d-flex align-items-center justify-content-center" style={{height: '400px'}}>
                <i className="bi-image text-muted" style={{fontSize: '4rem'}}></i>
              </div>
              <div className="position-absolute top-0 end-0 m-3">
                <Badge bg={getConditionColor(item.condition)} className="fs-6">
                  {item.condition}
                </Badge>
              </div>
            </div>
            <Card.Body>
              <Row className="g-2">
                {item.images.map((img, index) => (
                  <Col key={index} xs={4}>
                    <div className="thumbnail bg-light d-flex align-items-center justify-content-center" style={{height: '80px', cursor: 'pointer'}}>
                      <i className="bi-image text-muted"></i>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Item Details */}
        <Col lg={6}>
          <div className="mb-4">
            <h1 className="mb-2">{item.title}</h1>
            <div className="d-flex align-items-center mb-3">
              <span className="text-primary fw-bold fs-4 me-3">
                <i className="bi-coin me-1"></i>{item.points} points
              </span>
              <Badge bg="light" text="dark" className="me-2">{item.category}</Badge>
              <Badge bg="light" text="dark">{item.type}</Badge>
            </div>
          </div>

          {/* Key Details */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="card-title">Item Details</h5>
              <Row>
                <Col sm={6}>
                  <div className="mb-2">
                    <strong>Size:</strong> {item.size}
                  </div>
                  <div className="mb-2">
                    <strong>Condition:</strong> {item.condition}
                  </div>
                  <div className="mb-2">
                    <strong>Material:</strong> {item.material}
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="mb-2">
                    <strong>Original Price:</strong> {item.originalPrice}
                  </div>
                  <div className="mb-2">
                    <strong>Availability:</strong> 
                    <Badge bg="success" className="ms-2">{item.availability}</Badge>
                  </div>
                  <div className="mb-2">
                    <strong>Added:</strong> {new Date(item.dateAdded).toLocaleDateString()}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Action Buttons */}
          <div className="d-grid gap-2 mb-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleSwapRequest}
              disabled={item.availability !== 'Available'}
            >
              <i className="bi-arrow-repeat me-2"></i>
              Request Swap
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg" 
              onClick={handleRedeem}
              disabled={item.availability !== 'Available' || (user && user.points < item.points)}
            >
              <i className="bi-coin me-2"></i>
              Redeem with Points
              {user && user.points < item.points && (
                <small className="d-block">Need {item.points - user.points} more points</small>
              )}
            </Button>
          </div>

          {/* Uploader Info */}
          <Card className="mb-4">
            <Card.Body>
              <h5 className="card-title">About the Owner</h5>
              <div className="d-flex align-items-center">
                <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                  {item.uploader.name.charAt(0)}
                </div>
                <div>
                  <h6 className="mb-1">{item.uploader.name}</h6>
                  <div className="text-muted small">
                    <i className="bi-geo-alt me-1"></i>{item.uploader.location}
                  </div>
                  <div className="text-muted small">
                    <i className="bi-star-fill text-warning me-1"></i>
                    {item.uploader.rating} • {item.uploader.totalSwaps} swaps
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Full Description */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h5 className="card-title">Description</h5>
              <p className="card-text">{item.description}</p>
              
              <h6 className="mt-4">Measurements</h6>
              <Row>
                <Col sm={4}>
                  <div><strong>Chest:</strong> {item.measurements.chest}</div>
                </Col>
                <Col sm={4}>
                  <div><strong>Length:</strong> {item.measurements.length}</div>
                </Col>
                <Col sm={4}>
                  <div><strong>Sleeve:</strong> {item.measurements.sleeve}</div>
                </Col>
              </Row>

              <h6 className="mt-4">Care Instructions</h6>
              <p>{item.careInstructions}</p>

              <h6 className="mt-4">Reason for Swapping</h6>
              <p className="mb-0">{item.reasonForSwapping}</p>

              {item.tags.length > 0 && (
                <>
                  <h6 className="mt-4">Tags</h6>
                  <div>
                    {item.tags.map((tag, index) => (
                      <Badge key={index} bg="light" text="dark" className="me-2">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Swap Request Modal */}
      <Modal show={showSwapModal} onHide={() => setShowSwapModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Request Item Swap</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select an item to offer in exchange</Form.Label>
              <Form.Select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
                <option value="">Choose from your items...</option>
                {userItems.map((userItem) => (
                  <option key={userItem.id} value={userItem.id}>
                    {userItem.title} ({userItem.category})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message to owner (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={swapMessage}
                onChange={(e) => setSwapMessage(e.target.value)}
                placeholder="Tell the owner why you'd like to swap..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSwapModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={submitSwapRequest}
            disabled={!selectedItem}
          >
            Send Swap Request
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Redeem Confirmation Modal */}
      <Modal show={showRedeemModal} onHide={() => setShowRedeemModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Redemption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to redeem <strong>{item.title}</strong> for <strong>{item.points} points</strong>?</p>
          {user && (
            <div className="alert alert-info">
              <div>Current balance: {user.points} points</div>
              <div>After redemption: {user.points - item.points} points</div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRedeemModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmRedeem}>
            Confirm Redemption
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ItemDetailPage;
