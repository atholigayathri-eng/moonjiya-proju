import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-5 text-center my-5">
      <div className="display-1 text-primary fw-bold">404</div>
      <h2 className="fw-bold mb-3">Page Not Found</h2>
      <p className="text-secondary max-w-md mx-auto mb-4">
        Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <Link to="/" className="btn btn-primary btn-lg fw-bold px-4">
        <i className="bi bi-house me-2"></i>Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
