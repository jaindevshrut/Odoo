import { motion } from 'framer-motion';
import { useState } from 'react';

const clothesVariants = (duration, delay) => ({
  initial: { y: '100vh', opacity: 0 },
  animate: {
    y: '-100vh',
    opacity: 1,
    transition: {
      duration: duration,
      ease: 'linear',
      repeat: Infinity,
      delay: delay,
    },
  },
});

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const Admin = () => {
  const clothes = ['👗', '👚', '👖', '👔', '🧥', '👕', '🩳', '🧣', '👜', '👠'];
  const [activeSection, setActiveSection] = useState('pending-items');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const items = [
    {
      id: 1,
      title: 'Vintage Band T-Shirt',
      category: 'Shirts',
      description: 'Classic rock band tee from the 90s, excellent condition',
      uploader: 'Sarah Johnson',
      date: 'March 15, 2024',
      status: 'pending',
      image: 'https://via.placeholder.com/200x200/667eea/ffffff?text=👕',
    },
    {
      id: 2,
      title: 'Floral Summer Dress',
      category: 'Dresses',
      description: 'Light and breezy dress perfect for summer occasions',
      uploader: 'Emma Wilson',
      date: 'March 14, 2024',
      status: 'pending',
      image: 'https://via.placeholder.com/200x200/764ba2/ffffff?text=👗',
    },
    {
      id: 3,
      title: 'High-Waist Denim Jeans',
      category: 'Pants',
      description: 'Trendy high-waist jeans in excellent condition',
      uploader: 'Alex Chen',
      date: 'March 13, 2024',
      status: 'pending',
      image: 'https://via.placeholder.com/200x200/8b5cf6/ffffff?text=👖',
    },
    {
      id: 4,
      title: 'Black Leather Jacket',
      category: 'Jackets',
      description: 'Classic leather jacket with minimal wear',
      uploader: 'Mike Rodriguez',
      date: 'March 12, 2024',
      status: 'pending',
      image: 'https://via.placeholder.com/200x200/ec4899/ffffff?text=🧥',
    },
  ];

  const stats = [
    { title: 'Total Users', number: 1245, icon: '👥' },
    { title: 'Active Swaps', number: 89, icon: '🔄' },
    { title: 'Items Pending', number: 24, icon: '⏳' },
    { title: 'Total Items', number: 3567, icon: '📦' },
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterItems = () => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm);
      const matchesCategory = !categoryFilter || item.category.toLowerCase() === categoryFilter;
      const matchesStatus = !statusFilter || item.status.toLowerCase().includes(statusFilter);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const handleApprove = (id) => {
    if (window.confirm('Are you sure you want to approve this item?')) {
      console.log('Approving item:', id);
    }
  };

  const handleReject = (id) => {
    if (window.confirm('Are you sure you want to reject this item?')) {
      console.log('Rejecting item:', id);
    }
  };

  const handleViewDetails = (id) => {
    console.log('Viewing details for item:', id);
    alert('Item details would be shown here');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      window.location.href = 'login.html';
    }
  };

  return (
    <div className="admin-body relative">
      <div className="fixed inset-0 pointer-events-none floating-clothes">
        {clothes.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl clothing-item"
            variants={clothesVariants(8 + Math.random() * 4, Math.random() * 5)}
            initial="initial"
            animate="animate"
            style={{ left: `${Math.random() * 100}%` }}
          >
            {item}
          </motion.div>
        ))}
      </div>

      <div className="admin-container relative z-10">
        <header className="admin-header">
          <div className="admin-logo">
            <h1>👔 ReWear Admin Panel</h1>
            <span className="admin-tagline">Manage Platform Content</span>
          </div>
          <div className="admin-user-info">
            <span className="admin-welcome">Welcome, Admin</span>
            <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </header>

        <nav className="admin-sidebar">
          <ul className="admin-nav-menu">
            <li>
              <a
                href="#pending-items"
                className={`admin-nav-link ${activeSection === 'pending-items' ? 'active' : ''}`}
                onClick={() => handleNavClick('pending-items')}
              >
                ⏳ Pending Items
              </a>
            </li>
            <li>
              <a
                href="#all-items"
                className={`admin-nav-link ${activeSection === 'all-items' ? 'active' : ''}`}
                onClick={() => handleNavClick('all-items')}
              >
                👕 All Items
              </a>
            </li>
            <li>
              <a
                href="#user-reports"
                className={`admin-nav-link ${activeSection === 'user-reports' ? 'active' : ''}`}
                onClick={() => handleNavClick('user-reports')}
              >
                📊 User Reports
              </a>
            </li>
          </ul>
        </nav>

        <main className="admin-main-content">
          <section className="admin-stats-section">
            <div className="admin-stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="admin-stat-card"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-details">
                    <h3 className="stat-title">{stat.title}</h3>
                    <p className="stat-number">{stat.number}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className={`admin-content-section ${activeSection === 'pending-items' ? 'active' : ''}`} id="pending-items-section">
            <div className="section-header">
              <h2 className="section-title">Pending Items for Approval</h2>
              <div className="section-controls">
                <div className="search-filter-container">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search items..."
                    onChange={handleSearch}
                  />
                  <select className="filter-select" id="category-filter" onChange={handleCategoryFilter}>
                    <option value="">All Categories</option>
                    <option value="shirts">Shirts</option>
                    <option value="pants">Pants</option>
                    <option value="dresses">Dresses</option>
                    <option value="jackets">Jackets</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <select className="filter-select" id="status-filter" onChange={handleStatusFilter}>
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pending-items-grid">
              {filterItems().map((item) => (
                <motion.div
                  key={item.id}
                  className="admin-card item-card"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="item-image-container">
                    <img src={item.image} alt={item.title} className="item-image" />
                    <span className="item-category-badge">{item.category}</span>
                  </div>
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-meta">
                      <span className="uploader-info">
                        <span className="uploader-label">Uploaded by:</span>
                        <span className="uploader-name">{item.uploader}</span>
                      </span>
                      <span className="upload-date">{item.date}</span>
                    </div>
                    <div className="item-status">
                      <span className={`status-badge ${item.status}`}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)} Review</span>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="btn-approve" onClick={() => handleApprove(item.id)}>✅ Approve</button>
                    <button className="btn-reject" onClick={() => handleReject(item.id)}>❌ Reject</button>
                    <button className="btn-view-details" onClick={() => handleViewDetails(item.id)}>👁️ View Details</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className={`admin-content-section ${activeSection === 'all-items' ? 'active' : ''}`} id="all-items-section">
            <div className="section-header">
              <h2 className="section-title">All Items</h2>
            </div>
            <div className="all-items-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Uploader</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td><img src={item.image} alt={item.title} className="table-item-image" /></td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.uploader}</td>
                      <td><span className={`status-badge ${item.status}`}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span></td>
                      <td>{item.date}</td>
                      <td>
                        <button className="btn-table-action btn-edit">Edit</button>
                        <button className="btn-table-action btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={`admin-content-section ${activeSection === 'user-reports' ? 'active' : ''}`} id="user-reports-section">
            <div className="section-header">
              <h2 className="section-title">User Reports</h2>
            </div>
            <div className="reports-grid">
              <motion.div
                className="admin-card report-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="report-header">
                  <h3 className="report-title">User Activity Report</h3>
                  <span className="report-date">Last 30 days</span>
                </div>
                <div className="report-stats">
                  <div className="report-stat">
                    <span className="report-stat-label">New Users</span>
                    <span className="report-stat-value">147</span>
                  </div>
                  <div className="report-stat">
                    <span className="report-stat-label">Active Users</span>
                    <span className="report-stat-value">892</span>
                  </div>
                  <div className="report-stat">
                    <span className="report-stat-label">Items Posted</span>
                    <span className="report-stat-value">324</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="admin-card report-card"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="report-header">
                  <h3 className="report-title">Swap Activity Report</h3>
                  <span className="report-date">Last 7 days</span>
                </div>
                <div className="report-stats">
                  <div className="report-stat">
                    <span className="report-stat-label">Completed Swaps</span>
                    <span className="report-stat-value">45</span>
                  </div>
                  <div className="report-stat">
                    <span className="report-stat-label">Pending Swaps</span>
                    <span className="report-stat-value">23</span>
                  </div>
                  <div className="report-stat">
                    <span className="report-stat-label">Cancelled Swaps</span>
                    <span className="report-stat-value">8</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Admin;