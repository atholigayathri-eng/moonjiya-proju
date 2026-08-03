import React, { useState, useEffect } from 'react';
import { adminService } from '../services/miscServices';
import { useNotification } from '../context/NotificationContext';

const AdminPanel = () => {
  const { showSuccess, showError } = useNotification();

  const [stats, setStats] = useState({ totalUsers: 0, totalResources: 0, totalSkills: 0 });
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [st, usrs, res] = await Promise.all([
        adminService.getStatistics(),
        adminService.getUsers(),
        adminService.getResources()
      ]);
      setStats(st || { totalUsers: 0, totalResources: 0, totalSkills: 0 });
      setUsers(usrs || []);
      setResources(res || []);
    } catch (err) {
      console.error("Admin data error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleSuspendUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete/suspend this user?")) return;
    try {
      await adminService.suspendUser(userId);
      showSuccess("User account suspended.");
      fetchAdminData();
    } catch (err) {
      showError("Failed to suspend user.");
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this resource post?")) return;
    try {
      await adminService.deletePost(postId);
      showSuccess("Post removed from platform.");
      fetchAdminData();
    } catch (err) {
      showError("Failed to delete post.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4 bg-dark text-white p-4 rounded-4 shadow">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-shield-lock text-warning me-2"></i>EduCycle Admin Portal
          </h2>
          <p className="small text-secondary mb-0">Separate Management Portal for System Analytics & Content Moderation</p>
        </div>
        <span className="badge bg-danger px-3 py-2 fs-6">ADMINISTRATOR</span>
      </div>

      {/* Admin Tabs */}
      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button className={`nav-link fw-bold ${activeTab === 'stats' ? 'active bg-primary' : 'bg-light text-dark'}`} onClick={() => setActiveTab('stats')}>
            <i className="bi bi-graph-up me-2"></i>Analytics & Overview
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link fw-bold ${activeTab === 'users' ? 'active bg-primary' : 'bg-light text-dark'}`} onClick={() => setActiveTab('users')}>
            <i className="bi bi-people me-2"></i>User Moderation ({users.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link fw-bold ${activeTab === 'content' ? 'active bg-primary' : 'bg-light text-dark'}`} onClick={() => setActiveTab('content')}>
            <i className="bi bi-box-seam me-2"></i>Listing Moderation ({resources.length})
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <div>
          {/* Stats */}
          {activeTab === 'stats' && (
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card border-0 shadow-sm p-4 text-center bg-white rounded-4">
                  <i className="bi bi-people display-4 text-primary mb-2"></i>
                  <h2 className="fw-bold text-primary mb-1">{stats?.totalUsers || 0}</h2>
                  <span className="text-muted fw-semibold">Registered Campus Users</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm p-4 text-center bg-white rounded-4">
                  <i className="bi bi-book display-4 text-success mb-2"></i>
                  <h2 className="fw-bold text-success mb-1">{stats?.totalResources || 0}</h2>
                  <span className="text-muted fw-semibold">Academic Resources</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm p-4 text-center bg-white rounded-4">
                  <i className="bi bi-mortarboard display-4 text-info mb-2"></i>
                  <h2 className="fw-bold text-info mb-1">{stats?.totalSkills || 0}</h2>
                  <span className="text-muted fw-semibold">Peer Skills Offered</span>
                </div>
              </div>
            </div>
          )}

          {/* User Moderation */}
          {activeTab === 'users' && (
            <div className="card border-0 shadow-sm overflow-hidden rounded-4">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>College / Department</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((u) => {
                      const uId = u.userId || u.id;
                      return (
                        <tr key={uId}>
                          <td>#{uId}</td>
                          <td className="fw-semibold">{u.firstName} {u.lastName}</td>
                          <td>{u.email}</td>
                          <td>{u.college || 'Engineering'} • {u.department || 'CS'}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleSuspendUser(uId)}
                            >
                              <i className="bi bi-person-x me-1"></i>Delete User
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr><td colSpan="5" className="text-center text-muted py-4">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Listing Moderation */}
          {activeTab === 'content' && (
            <div className="card border-0 shadow-sm overflow-hidden rounded-4">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Item ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Exchange Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.length > 0 ? (
                    resources.map((res) => {
                      const resId = res.resourceId || res.id;
                      return (
                        <tr key={resId}>
                          <td>#{resId}</td>
                          <td className="fw-semibold">{res.title}</td>
                          <td>{res.category}</td>
                          <td><span className="badge bg-secondary">{res.exchangeType}</span></td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeletePost(resId)}
                            >
                              <i className="bi bi-trash me-1"></i>Remove Listing
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr><td colSpan="5" className="text-center text-muted py-4">No listings to moderate.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
