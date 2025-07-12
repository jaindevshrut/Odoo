import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddNewItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    material: '',
    originalPrice: '',
    reasonForSwapping: '',
    careInstructions: '',
    tags: '',
    measurements: {
      chest: '',
      length: '',
      sleeve: ''
    }
  });
  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Tops', 'Bottoms', 'Dresses', 'Jackets', 'Coats', 
    'Footwear', 'Accessories', 'Activewear', 'Formal', 'Sleepwear'
  ];

  const types = {
    'Tops': ['T-Shirt', 'Blouse', 'Shirt', 'Tank Top', 'Sweater', 'Hoodie'],
    'Bottoms': ['Jeans', 'Pants', 'Shorts', 'Skirt', 'Leggings'],
    'Dresses': ['Casual', 'Formal', 'Cocktail', 'Maxi', 'Mini'],
    'Jackets': ['Denim', 'Leather', 'Blazer', 'Bomber', 'Windbreaker'],
    'Coats': ['Winter', 'Trench', 'Wool', 'Raincoat', 'Pea Coat'],
    'Footwear': ['Sneakers', 'Boots', 'Sandals', 'Heels', 'Flats'],
    'Accessories': ['Bag', 'Hat', 'Scarf', 'Belt', 'Jewelry'],
    'Activewear': ['Sports Bra', 'Leggings', 'Shorts', 'Tank', 'Jacket'],
    'Formal': ['Suit', 'Dress Shirt', 'Dress Pants', 'Ties', 'Dress Shoes'],
    'Sleepwear': ['Pajamas', 'Nightgown', 'Robe', 'Sleep Shirt']
  };

  const sizes = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL',
    'US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12',
    '28', '30', '32', '34', '36', '38', '40'
  ];

  const conditions = [
    'Like New', 'Excellent', 'Very Good', 'Good', 'Fair'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      setAlert({
        show: true,
        message: 'You can upload maximum 5 images.',
        variant: 'warning'
      });
      return;
    }
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));
    
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      // Cleanup URL
      const toRemove = prev.find(img => img.id === imageId);
      if (toRemove) {
        URL.revokeObjectURL(toRemove.preview);
      }
      return updated;
    });
  };

  const calculatePoints = () => {
    const conditionValues = {
      'Like New': 100,
      'Excellent': 85,
      'Very Good': 70,
      'Good': 55,
      'Fair': 40
    };

    const categoryValues = {
      'Coats': 20,
      'Jackets': 15,
      'Dresses': 15,
      'Footwear': 10,
      'Tops': 8,
      'Bottoms': 8,
      'Accessories': 5,
      'Activewear': 8,
      'Formal': 18,
      'Sleepwear': 5
    };

    const basePoints = categoryValues[formData.category] || 10;
    const conditionMultiplier = (conditionValues[formData.condition] || 50) / 100;
    
    return Math.round(basePoints * conditionMultiplier * 3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.category || 
          !formData.size || !formData.condition || images.length === 0) {
        setAlert({
          show: true,
          message: 'Please fill in all required fields and upload at least one image.',
          variant: 'danger'
        });
        setIsSubmitting(false);
        return;
      }

      // Mock API call - in real app, this would upload images and create item
      const itemData = {
        ...formData,
        id: Date.now(),
        points: calculatePoints(),
        images: images.map(img => img.file.name),
        dateAdded: new Date().toISOString(),
        uploader: JSON.parse(localStorage.getItem('user') || '{}'),
        availability: 'Available'
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setAlert({
        show: true,
        message: 'Item listed successfully! Your item is now available for swapping.',
        variant: 'success'
      });

      // Reset form after successful submission
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      setAlert({
        show: true,
        message: 'Error listing item. Please try again.',
        variant: 'danger'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedPoints = formData.category && formData.condition ? calculatePoints() : 0;

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="mb-4">
            <h1 className="mb-2">Add New Item</h1>
            <p className="text-muted">List your clothing item for swapping or points redemption</p>
          </div>

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

          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Images Upload */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">Photos <span className="text-danger">*</span></h5>
                    <small className="text-muted">Upload up to 5 high-quality photos</small>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={images.length >= 5}
                      />
                      <Form.Text className="text-muted">
                        Accepted formats: JPG, PNG, WebP. Max 5 images.
                      </Form.Text>
                    </Form.Group>

                    {images.length > 0 && (
                      <Row className="g-3">
                        {images.map((image) => (
                          <Col key={image.id} xs={6} md={4} lg={3}>
                            <div className="position-relative">
                              <img
                                src={image.preview}
                                alt="Preview"
                                className="img-fluid rounded"
                                style={{ height: '100px', objectFit: 'cover', width: '100%' }}
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 m-1 rounded-circle"
                                onClick={() => removeImage(image.id)}
                                style={{ width: '24px', height: '24px', padding: '0' }}
                              >
                                ×
                              </Button>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Card.Body>
                </Card>

                {/* Basic Information */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">Basic Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Vintage Levi's Denim Jacket"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Description <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe the item's condition, style, fit, and any special features..."
                        required
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Type</Form.Label>
                          <Form.Select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            disabled={!formData.category}
                          >
                            <option value="">Select Type</option>
                            {formData.category && types[formData.category]?.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Size <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Size</option>
                            {sizes.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Condition <span className="text-danger">*</span></Form.Label>
                          <Form.Select
                            name="condition"
                            value={formData.condition}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Condition</option>
                            {conditions.map(cond => (
                              <option key={cond} value={cond}>{cond}</option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Additional Details */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">Additional Details</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Material</Form.Label>
                          <Form.Control
                            type="text"
                            name="material"
                            value={formData.material}
                            onChange={handleInputChange}
                            placeholder="e.g., 100% Cotton, Leather, Polyester"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Original Price</Form.Label>
                          <Form.Control
                            type="text"
                            name="originalPrice"
                            value={formData.originalPrice}
                            onChange={handleInputChange}
                            placeholder="e.g., $120"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Reason for Swapping</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="reasonForSwapping"
                        value={formData.reasonForSwapping}
                        onChange={handleInputChange}
                        placeholder="Why are you swapping this item?"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Care Instructions</Form.Label>
                      <Form.Control
                        type="text"
                        name="careInstructions"
                        value={formData.careInstructions}
                        onChange={handleInputChange}
                        placeholder="e.g., Machine wash cold, hang dry"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Tags</Form.Label>
                      <Form.Control
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="vintage, casual, formal (comma separated)"
                      />
                      <Form.Text className="text-muted">
                        Separate tags with commas to help others find your item
                      </Form.Text>
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Measurements (for clothing) */}
                {['Tops', 'Jackets', 'Coats', 'Dresses'].includes(formData.category) && (
                  <Card className="mb-4">
                    <Card.Header>
                      <h5 className="mb-0">Measurements (Optional)</h5>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Chest/Bust</Form.Label>
                            <Form.Control
                              type="text"
                              name="measurements.chest"
                              value={formData.measurements.chest}
                              onChange={handleInputChange}
                              placeholder="e.g., 40 inches"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Length</Form.Label>
                            <Form.Control
                              type="text"
                              name="measurements.length"
                              value={formData.measurements.length}
                              onChange={handleInputChange}
                              placeholder="e.g., 25 inches"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Sleeve</Form.Label>
                            <Form.Control
                              type="text"
                              name="measurements.sleeve"
                              value={formData.measurements.sleeve}
                              onChange={handleInputChange}
                              placeholder="e.g., 24 inches"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}

                {/* Points Estimation */}
                {estimatedPoints > 0 && (
                  <Card className="mb-4 border-primary">
                    <Card.Body className="text-center">
                      <h5 className="text-primary mb-2">
                        <i className="bi-coin me-2"></i>
                        Estimated Value: {estimatedPoints} points
                      </h5>
                      <p className="text-muted mb-0">
                        This is based on category, condition, and other factors
                      </p>
                    </Card.Body>
                  </Card>
                )}

                {/* Submit Button */}
                <div className="d-grid gap-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Listing Item...
                      </>
                    ) : (
                      <>
                        <i className="bi-plus-circle me-2"></i>
                        List Item for Swapping
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => navigate('/dashboard')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewItem;
