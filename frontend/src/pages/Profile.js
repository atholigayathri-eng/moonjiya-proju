import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/userService';
import { useNotification } from '../context/NotificationContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    college: user?.college || '',
    department: user?.department || '',
    bio: user?.bio || ''
  });

  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      userService.getUserRatings(user.id)
        .then(data => setRatings(data || []))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Keep ratings in state for future rating display expansion
  if (ratings.length > 0) {
    // console.log("Ratings:", ratings.length);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await userService.updateProfile(user.id, formData);
      updateUser(updated);
      showSuccess("Profile updated successfully!");
    } catch (err) {
      showError("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm text-center p-4">
            <div className="mx-auto bg-primary text-white display-4 fw-bold rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '90px', height: '90px' }}>
              {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
            </div>
            <h4 className="fw-bold mb-1">{user?.firstName} {user?.lastName}</h4>
            <p className="text-secondary small mb-2">{user?.email}</p>
            <span className="badge bg-primary-subtle text-primary border border-primary px-3 py-2 rounded-pill mx-auto mb-3">
              {user?.department || 'Student Member'}
            </span>

            <div className="border-top pt-3 mt-2 text-start small">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">College:</span>
                <span className="fw-semibold">{user?.college || 'N/A'}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Phone:</span>
                <span className="fw-semibold">{user?.phone || 'N/A'}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Community Rating:</span>
                <span className="fw-bold text-warning">
                  <i className="bi bi-star-fill me-1"></i>4.9 / 5.0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <h4 className="fw-bold mb-4">Edit Student Profile</h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Campus Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    disabled
                    value={formData.email}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">College / Institution</label>
                  <input
                    type="text"
                    name="college"
                    className="form-control"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Department</label>
                  <input
                    type="text"
                    name="department"
                    className="form-control"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Bio / Academic Interests</label>
                  <textarea
                    name="bio"
                    className="form-control"
                    rows="3"
                    placeholder="Tell your campus peers about your studies, hobbies, or expertise..."
                    value={formData.bio}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <button type="submit" className="btn btn-primary fw-bold px-4 mt-4" disabled={loading}>
                {loading ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
