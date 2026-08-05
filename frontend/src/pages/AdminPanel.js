import React, { useState, useEffect, useCallback } from 'react';
import AnimatedPage from '../components/AnimatedPage';
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

  const fetchAdminData = useCallback(async () => {
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
  }, [showError]);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAdminData();
    }
  }, [isAdminLoggedIn, fetchAdminData]);

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
      <AnimatedPage className="container py-5 my-md-4">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="glass-card overflow-hidden border-0 shadow-lg p-0">
              <div className="text-white p-4 p-md-5 text-center" style={{ background: 'var(--primary-gradient)' }}>
                <div 
                  className="d-inline-flex align-items-center justify-content-center text-white rounded-circle shadow-sm mb-3"
                  style={{ width: '56px', height: '56px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
                >
                  <i className="bi bi-shield-lock-fill fs-2"></i>
                </div>
                <h3 className="fw-extrabold mb-1" style={{ letterSpacing: '-0.02em' }}>Admin Portal Login</h3>
                <p className="small mb-0 opacity-80">Restricted Management Console for EduCycle Platform Administrators</p>
              </div>
              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleAdminLogin}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-dark">Admin Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-envelope"></i></span>
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
                    <label className="form-label fw-semibold text-dark">Admin Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-key"></i></span>
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

                  <button type="submit" className="btn btn-primary w-100 py-3 fw-bold shadow" disabled={loggingIn}>
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
      </AnimatedPage>
    );
  }

  // Render Admin Dashboard when authenticated as ADMIN
  return (
    <AnimatedPage className="container py-5">
      <div className="glass-card p-4 p-md-5 mb-5 text-white d-flex align-items-center justify-content-between flex-column flex-md-row gap-3" style={{ background: 'var(--primary-gradient)' }}>
        <div>
          <h2 className="fw-extrabold mb-1 d-flex align-items-center gap-2" style={{ letterSpacing: '-0.02em' }}>
            <i className="bi bi-shield-lock-fill"></i>EduCycle Admin Portal
          </h2>
          <p className="small mb-0 opacity-80">System Analytics & Registered Users Moderation</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="badge bg-white text-primary px-3 py-2 fw-bold shadow-sm">ADMINISTRATOR</span>
          <button className="btn btn-outline-light btn-sm fw-bold px-3 py-2" onClick={logout}>
            <i className="bi bi-box-arrow-right me-1"></i>Logout Admin
          </button>
        </div>
      </div>

      {/* Admin Navigation Pills */}
      <ul className="nav nav-pills mb-4 gap-2 border-bottom border-subtle pb-3">
        <li className="nav-item">
          <button className={`nav-link fw-bold ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
            <i className="bi bi-graph-up me-2"></i>Analytics & Overview
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link fw-bold ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <i className="bi bi-people me-2"></i>Registered Users ({users.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link fw-bold ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}>
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
                <div className="glass-card p-4 text-center">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center text-primary rounded-circle mb-3"
                    style={{ width: '56px', height: '56px', background: 'var(--primary-light)' }}
                  >
                    <i className="bi bi-people-fill fs-3"></i>
                  </div>
                  <h2 className="fw-extrabold text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>{stats?.totalUsers || 0}</h2>
                  <span className="text-muted fw-semibold small">Registered Campus Users</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-4 text-center">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center text-primary rounded-circle mb-3"
                    style={{ width: '56px', height: '56px', background: 'var(--primary-light)' }}
                  >
                    <i className="bi bi-book-fill fs-3"></i>
                  </div>
                  <h2 className="fw-extrabold text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>{stats?.totalResources || 0}</h2>
                  <span className="text-muted fw-semibold small">Academic Resources</span>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-4 text-center">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center text-primary rounded-circle mb-3"
                    style={{ width: '56px', height: '56px', background: 'var(--primary-light)' }}
                  >
                    <i className="bi bi-mortarboard-fill fs-3"></i>
                  </div>
                  <h2 className="fw-extrabold text-dark mb-1" style={{ letterSpacing: '-0.02em' }}>{stats?.totalSkills || 0}</h2>
                  <span className="text-muted fw-semibold small">Peer Skills Offered</span>
                </div>
              </div>
            </div>
          )}

          {/* User Moderation Tab */}
          {activeTab === 'users' && (
            <div className="glass-card overflow-hidden p-0">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
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
                          <td className="fw-bold text-primary">#{uId}</td>
                          <td className="fw-bold text-dark">{u.firstName} {u.lastName}</td>
                          <td className="text-muted">{u.email}</td>
                          <td className="small">{u.college || 'Engineering'} • {u.department || 'CS'}</td>
                          <td>
                            <span className={`badge ${u.role === 'ADMIN' ? 'bg-danger text-white' : 'bg-primary text-primary'}`}>
                              {u.role || 'USER'}
                            </span>
                          </td>
                          <td>
                            {u.role !== 'ADMIN' && (
                              <button
                                className="btn btn-sm btn-outline-danger px-3 fw-bold"
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
            <div className="glass-card overflow-hidden p-0">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
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
                          <td className="fw-bold text-primary">#{resId}</td>
                          <td className="fw-bold text-dark">{res.title}</td>
                          <td><span className="badge-pill-accent">{res.category}</span></td>
                          <td><span className="badge bg-light text-secondary border">{res.exchangeType}</span></td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger px-3 fw-bold"
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
    </AnimatedPage>
  );
};

export default AdminPanel;
