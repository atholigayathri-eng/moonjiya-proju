import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Register = () => {
  const { register } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.94, opacity: 0, y: 25 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      showSuccess("Registration successful! Please log in.");
      navigate('/login');
    } catch (err) {
      showError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage className="container py-5 my-md-3">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div ref={cardRef} className="glass-card overflow-hidden border-0 shadow-lg p-0">
            <div className="text-white text-center p-4 p-md-5" style={{ background: 'var(--primary-gradient)' }}>
              <div 
                className="d-inline-flex align-items-center justify-content-center text-white rounded-circle shadow-sm mb-3"
                style={{ width: '56px', height: '56px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
              >
                <i className="bi bi-person-plus-fill fs-2"></i>
              </div>
              <h3 className="fw-extrabold mb-1" style={{ letterSpacing: '-0.02em' }}>Join EduCycle Campus Community</h3>
              <p className="small mb-0 opacity-80">Connect with peers to share books, tools, and skills</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Campus Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      required
                      placeholder="student@college.edu"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">College / University</label>
                    <input
                      type="text"
                      name="college"
                      className="form-control"
                      required
                      value={formData.college}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Department / Major</label>
                    <input
                      type="text"
                      name="department"
                      className="form-control"
                      required
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      required
                      minLength="6"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-dark">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold mt-4 shadow" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registering Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <hr className="my-4 opacity-10" />

              <div className="text-center small text-muted">
                Already registered?{' '}
                <Link to="/login" className="text-primary fw-bold text-decoration-none">
                  Sign In Here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Register;
