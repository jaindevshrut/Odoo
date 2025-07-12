import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BrowseItems = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    size: '',
    condition: '',
    sortBy: 'newest'
  });

  // Mock data for items
  const allItems = [
    {
      id: 1,
      title: "Designer Denim Jacket",
      description: "Vintage Levi's denim jacket in excellent condition",
      category: "Jackets",
      size: "M",
      condition: "Excellent",
      points: 85,
      uploader: "Sarah M.",
      location: "New York",
      dateAdded: "2025-01-12",
      images: ["jacket1.jpg"],
      tags: ["vintage", "denim", "casual"]
    },
    {
      id: 2,
      title: "Vintage Summer Dress",
      description: "Beautiful floral summer dress, perfect for warm weather",
      category: "Dresses",
      size: "S",
      condition: "Very Good",
      points: 65,
      uploader: "Emma K.",
      location: "Los Angeles",
      dateAdded: "2025-01-11",
      images: ["dress1.jpg"],
      tags: ["vintage", "floral", "summer"]
    },
    {
      id: 3,
      title: "Leather Ankle Boots",
      description: "Genuine leather ankle boots with minimal wear",
      category: "Footwear",
      size: "US 8",
      condition: "Good",
      points: 75,
      uploader: "Mike T.",
      location: "Chicago",
      dateAdded: "2025-01-10",
      images: ["boots1.jpg"],
      tags: ["leather", "boots", "formal"]
    },
    {
      id: 4,
      title: "Wool Winter Coat",
      description: "Warm wool coat, perfect for cold winter days",
      category: "Coats",
      size: "L",
      condition: "Excellent",
      points: 120,
      uploader: "Lisa R.",
      location: "Boston",
      dateAdded: "2025-01-09",
      images: ["coat1.jpg"],
      tags: ["wool", "winter", "formal"]
    },
    {
      id: 5,
      title: "Silk Evening Blouse",
      description: "Elegant silk blouse for special occasions",
      category: "Tops",
      size: "XS",
      condition: "Like New",
      points: 95,
      uploader: "Anna P.",
      location: "Miami",
      dateAdded: "2025-01-08",
      images: ["blouse1.jpg"],
      tags: ["silk", "elegant", "evening"]
    },
    {
      id: 6,
      title: "Cotton Casual T-Shirt",
      description: "Comfortable cotton t-shirt for everyday wear",
      category: "Tops",
      size: "M",
      condition: "Good",
      points: 25,
      uploader: "John D.",
      location: "Seattle",
      dateAdded: "2025-01-07",
      images: ["tshirt1.jpg"],
      tags: ["cotton", "casual", "everyday"]
    }
  ];

  const categories = ['All Categories', 'Tops', 'Bottoms', 'Dresses', 'Jackets', 'Coats', 'Footwear', 'Accessories'];
  const sizes = ['All Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10'];
  const conditions = ['All Conditions', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair'];

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Filter and sort items
  const filteredItems = allItems.filter(item => {
    return (
      (filters.search === '' || 
       item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
       item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
       item.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))) &&
      (filters.category === '' || filters.category === 'All Categories' || item.category === filters.category) &&
      (filters.size === '' || filters.size === 'All Sizes' || item.size === filters.size) &&
      (filters.condition === '' || filters.condition === 'All Conditions' || item.condition === filters.condition)
    );
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'newest':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case 'oldest':
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case 'points-low':
        return a.points - b.points;
      case 'points-high':
        return b.points - a.points;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

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

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-2">Browse Items</h1>
          <p className="text-muted">Discover amazing clothing items from our community</p>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text><i className="bi-search"></i></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search items..."
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Select name="category" value={filters.category} onChange={handleFilterChange}>
                {categories.map(cat => (
                  <option key={cat} value={cat === 'All Categories' ? '' : cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Select name="size" value={filters.size} onChange={handleFilterChange}>
                {sizes.map(size => (
                  <option key={size} value={size === 'All Sizes' ? '' : size}>
                    {size}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Select name="condition" value={filters.condition} onChange={handleFilterChange}>
                {conditions.map(cond => (
                  <option key={cond} value={cond === 'All Conditions' ? '' : cond}>
                    {cond}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="points-low">Points: Low to High</option>
                <option value="points-high">Points: High to Low</option>
                <option value="alphabetical">Alphabetical</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results Info */}
      <Row className="mb-3">
        <Col>
          <p className="text-muted mb-0">
            Showing {filteredItems.length} of {allItems.length} items
          </p>
        </Col>
      </Row>

      {/* Items Grid */}
      <Row className="g-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Col key={item.id} md={6} lg={4} xl={3}>
              <Card className="h-100 item-card">
                <div className="position-relative">
                  <div className="item-image bg-light d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                    <i className="bi-image text-muted" style={{fontSize: '3rem'}}></i>
                  </div>
                  <div className="position-absolute top-0 end-0 m-2">
                    <Badge bg={getConditionColor(item.condition)}>
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <h6 className="card-title mb-2">
                    <Link to={`/item/${item.id}`} className="text-decoration-none text-dark">
                      {item.title}
                    </Link>
                  </h6>
                  
                  <p className="card-text text-muted small mb-3 flex-grow-1">
                    {item.description.length > 60 
                      ? `${item.description.substring(0, 60)}...` 
                      : item.description
                    }
                  </p>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between text-sm mb-1">
                      <span className="text-muted">Category:</span>
                      <span>{item.category}</span>
                    </div>
                    <div className="d-flex justify-content-between text-sm mb-1">
                      <span className="text-muted">Size:</span>
                      <span>{item.size}</span>
                    </div>
                    <div className="d-flex justify-content-between text-sm mb-1">
                      <span className="text-muted">Location:</span>
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="text-primary fw-bold">
                      <i className="bi-coin me-1"></i>{item.points} points
                    </div>
                    <small className="text-muted">by {item.uploader}</small>
                  </div>

                  <div className="mt-auto">
                    <Button 
                      as={Link} 
                      to={`/item/${item.id}`} 
                      variant="primary" 
                      size="sm" 
                      className="w-100"
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5">
              <div className="display-1 text-muted mb-3">
                <i className="bi-search"></i>
              </div>
              <h4 className="mb-3">No items found</h4>
              <p className="text-muted mb-4">Try adjusting your search criteria or filters</p>
              <Button 
                variant="outline-primary" 
                onClick={() => setFilters({search: '', category: '', size: '', condition: '', sortBy: 'newest'})}
              >
                Clear All Filters
              </Button>
            </div>
          </Col>
        )}
      </Row>

      {/* Load More */}
      {filteredItems.length > 0 && filteredItems.length >= 12 && (
        <Row className="mt-4">
          <Col className="text-center">
            <Button variant="outline-primary">
              Load More Items
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BrowseItems;
