import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold text-warning mb-3">
              <i className="bi bi-recycle me-2"></i>EduCycle
            </h5>
            <p className="text-secondary small">
              A collaborative student community platform designed for campus resource sharing and peer-to-peer skill exchange. Reduce waste, save money, and grow together.
            </p>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/resources" className="text-secondary text-decoration-none">Academic Resources</Link></li>
              <li className="mb-2"><Link to="/skills" className="text-secondary text-decoration-none">Peer Skills</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="text-secondary text-decoration-none">Dashboard</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><span className="text-secondary">Textbooks & Notes</span></li>
              <li className="mb-2"><span className="text-secondary">Lab Kits & Equipment</span></li>
              <li className="mb-2"><span className="text-secondary">Programming & Tech</span></li>
              <li className="mb-2"><span className="text-secondary">Languages & Math</span></li>
            </ul>
          </div>


        </div>

        <hr className="my-4 border-secondary" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small text-secondary">
          <p className="mb-0">&copy; {new Date().getFullYear()} EduCycle Platform. All rights reserved.</p>
          <div className="d-flex gap-3 mt-2 mt-sm-0">
            <span className="text-secondary">Privacy Policy</span>
            <span className="text-secondary">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
