import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';

const NotFound = () => {
  return (
    <AnimatedPage className="container py-5 text-center my-5">
      <div className="glass-card max-w-md mx-auto p-5">
        <div 
          className="display-1 fw-extrabold mb-2"
          style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          404
        </div>
        <h2 className="fw-extrabold text-dark mb-3">Page Not Found</h2>
        <p className="text-muted mx-auto mb-4" style={{ maxWidth: '400px' }}>
          Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link to="/" className="btn btn-primary btn-lg fw-bold px-4 py-3 shadow">
          <i className="bi bi-house-fill me-2"></i>Back to Home
        </Link>
      </div>
    </AnimatedPage>
  );
};

export default NotFound;
