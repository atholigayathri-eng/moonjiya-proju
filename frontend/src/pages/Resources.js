import React, { useState, useEffect } from 'react';
import ResourceCard from '../components/ResourceCard';
import RequestModal from '../components/RequestModal';
import { resourceService } from '../services/resourceService';
import { requestService } from '../services/requestService';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Resources = () => {
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [exchangeType, setExchangeType] = useState('');

  // Modal State
  const [selectedResource, setSelectedResource] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  // New Resource Form
  const [newResource, setNewResource] = useState({
    title: '',
    category: 'Textbooks',
    condition: 'Good',
    exchangeType: 'donate',
    description: '',
    quantity: 1,
    imageUrl: ''
  });

  const categories = ['Textbooks', 'Notes', 'Lab Kits', 'Project Components', 'Lab Equipment', 'Other'];

  const fetchResources = async () => {
    setLoading(true);
    try {
      const data = await resourceService.getAll({ category, exchangeType, search });
      setResources(data.content || data || []);
    } catch (err) {
      showError("Failed to fetch resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, exchangeType]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchResources();
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await resourceService.create(newResource);
      showSuccess("Resource posted successfully!");
      setShowPostModal(false);
      setNewResource({
        title: '',
        category: 'Textbooks',
        condition: 'Good',
        exchangeType: 'donate',
        description: '',
        quantity: 1,
        imageUrl: ''
      });
      fetchResources();
    } catch (err) {
      showError("Failed to post resource.");
    }
  };

  const handleRequestSubmit = async (data) => {
    try {
      await requestService.createResourceRequest(data);
      showSuccess("Resource request sent successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Request failed.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Academic Resources Exchange</h2>
          <p className="text-secondary mb-0">Browse textbooks, lab equipment, notes, and components posted by campus peers</p>
        </div>
        {isAuthenticated && (
          <button className="btn btn-primary fw-bold px-4" onClick={() => setShowPostModal(true)}>
            <i className="bi bi-plus-lg me-2"></i>Post a Resource
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="card border-0 shadow-sm p-3 mb-4">
        <form onSubmit={handleSearchSubmit} className="row g-3 align-items-center">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by title, subject, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select" value={exchangeType} onChange={(e) => setExchangeType(e.target.value)}>
              <option value="">All Exchange Types</option>
              <option value="donate">Donate</option>
              <option value="lend">Lend</option>
              <option value="exchange">Exchange</option>
            </select>
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-secondary w-100 fw-semibold">Go</button>
          </div>
        </form>
      </div>

      {/* Resource Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="row g-4">
          {resources.length > 0 ? (
            resources.map((item) => (
              <div className="col-lg-3 col-md-6" key={item.id || item.resourceId}>
                <ResourceCard resource={item} onRequest={(res) => setSelectedResource(res)} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5 bg-light rounded-3 border">
              <i className="bi bi-box-seam display-4 text-muted d-block mb-3"></i>
              <h5>No resources found</h5>
              <p className="text-muted small">Try tweaking your search keywords or category filters.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal to Post New Resource */}
      {showPostModal && (
        <div className="modal show d-block tab-modal-backdrop" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow border-0">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold"><i className="bi bi-plus-circle me-2"></i>Post Academic Resource</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowPostModal(false)}></button>
              </div>
              <form onSubmit={handlePostSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">Resource Title</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="e.g. Data Structures & Algorithms textbook"
                        value={newResource.title}
                        onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Category</label>
                      <select
                        className="form-select"
                        value={newResource.category}
                        onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Condition</label>
                      <select
                        className="form-select"
                        value={newResource.condition}
                        onChange={(e) => setNewResource({ ...newResource, condition: e.target.value })}
                      >
                        <option value="New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Exchange Type</label>
                      <select
                        className="form-select"
                        value={newResource.exchangeType}
                        onChange={(e) => setNewResource({ ...newResource, exchangeType: e.target.value })}
                      >
                        <option value="donate">Donate</option>
                        <option value="lend">Lend</option>
                        <option value="exchange">Exchange</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={newResource.quantity}
                        onChange={(e) => setNewResource({ ...newResource, quantity: parseInt(e.target.value) || 1 })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Image URL (Optional)</label>
                      <input
                        type="url"
                        className="form-control"
                        placeholder="https://example.com/image.jpg"
                        value={newResource.imageUrl}
                        onChange={(e) => setNewResource({ ...newResource, imageUrl: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Description & Pickup Details</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        required
                        placeholder="Provide details about edition, condition, and preferred campus pickup locations..."
                        value={newResource.description}
                        onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPostModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary fw-bold">Publish Listing</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      <RequestModal
        show={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        item={selectedResource}
        type="resource"
        onSubmit={handleRequestSubmit}
      />
    </div>
  );
};

export default Resources;
