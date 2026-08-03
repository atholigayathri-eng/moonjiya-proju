import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/miscServices';
import { useNotification } from '../context/NotificationContext';

const AdminPanel = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [stats, setStats] = useState({ totalUsers: 0, totalResources: 0, totalSkills: 0 });
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(false);

  const isAdminLoggedIn = isAuthenticated && user?.role === 'ADMIN';

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
      showError("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAdminData();
    }
  }, [isAdminLoggedIn]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      await login(adminEmail, adminPassword);
      showSuccess("Admin authentication successful!");
    } catch (err) {
      showError(err.response?.data?.message || "Invalid Admin Credentials!");
    } finally {
      setLoggingIn(false);
    }
  };

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

  // Render Admin Login Form if not logged in as Admin
  if (!isAdminLoggedIn) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="bg-dark text-white p-4 text-center">
                <i className="bi bi-shield-lock-fill display-3 text-warning mb-2"></i>
                <h3 className="fw-bold mb-1">Admin Portal Login</h3>
                <p className="text-secondary small mb-0">Restricted Management Console for EduCycle Platform Administrators</p>
              </div>
              <div className="card-body p-4 bg-light">
                <form onSubmit={handleAdminLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-bold text-dark">Admin Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-envelope"></i></span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="admin@educycle.edu"
                        required
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                      />
                    </div>
                    <small className="text-muted">Default admin email: <code>admin@educycle.edu</code></small>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold text-dark">Admin Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white"><i className="bi bi-key"></i></span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                      />
                    </div>
                    <small className="text-muted">Default admin password: <code>admin123</code></small>
                  </div>

                  <button type="submit" className="btn btn-warning w-100 fw-bold py-2 shadow-sm" disabled={loggingIn}>
                    {loggingIn ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-box-arrow-in-right me-2"></i>Login to Admin Console
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard when authenticated as ADMIN
  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4 bg-dark text-white p-4 rounded-4 shadow">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-shield-lock text-warning me-2"></i>EduCycle Admin Portal
          </h2>
          <p className="small text-secondary mb-0">System Analytics & Registered Users Moderation</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-danger px-3 py-2 fs-6">ADMINISTRATOR</span>
          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            <i className="bi bi-box-arrow-right me-1"></i>Logout Admin
          </button>
        </div>
      </div>

      {/* Admin Navigation Pills */}
      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button className={`nav-link fw-bold ${activeTab === 'stats' ? 'active bg-primary' : 'bg-light text-dark'}`} onClick={() => setActiveTab('stats')}>
            <i className="bi bi-graph-up me-2"></i>Analytics & Overview
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link fw-bold ${activeTab === 'users' ? 'active bg-primary' : 'bg-light text-dark'}`} onClick={() => setActiveTab('users')}>
            <i className="bi bi-people me-2"></i>Registered Users ({users.length})
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
          {/* Stats Tab */}
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

          {/* User Moderation Tab */}
          {activeTab === 'users' && (
            <div className="card border-0 shadow-sm overflow-hidden rounded-4">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>College / Department</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((u) => {
                      const uId = u.userId || u.id;
                      return (
                        <tr key={uId}>
                          <td className="fw-bold">#{uId}</td>
                          <td className="fw-semibold">{u.firstName} {u.lastName}</td>
                          <td>{u.email}</td>
                          <td>{u.college || 'Engineering'} • {u.department || 'CS'}</td>
                          <td>
                            <span className={`badge ${u.role === 'ADMIN' ? 'bg-danger' : 'bg-success'}`}>
                              {u.role || 'USER'}
                            </span>
                          </td>
                          <td>
                            {u.role !== 'ADMIN' && (
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleSuspendUser(uId)}
                              >
                                <i className="bi bi-person-x me-1"></i>Delete User
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr><td colSpan="6" className="text-center text-muted py-4">No users found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Listing Moderation Tab */}
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
                          <td className="fw-bold">#{resId}</td>
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
