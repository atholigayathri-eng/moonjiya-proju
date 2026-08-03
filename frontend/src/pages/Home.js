import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';
import SkillCard from '../components/SkillCard';
import RequestModal from '../components/RequestModal';
import { resourceService } from '../services/resourceService';
import { skillService } from '../services/skillService';
import { requestService } from '../services/requestService';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resData, skillData] = await Promise.all([
          resourceService.getAll({ limit: 4 }),
          skillService.getAll({ limit: 4 })
        ]);
        setResources(resData.content || resData || []);
        setSkills(skillData.content || skillData || []);
      } catch (err) {
        console.error("Failed to load home data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRequestClick = (item, type) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSelectedItem(item);
    setModalType(type);
  };

  const handleModalSubmit = async (data) => {
    try {
      if (modalType === 'resource') {
        await requestService.createResourceRequest(data);
      } else {
        await requestService.createSkillRequest(data);
      }
      showSuccess("Request submitted successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Failed to submit request.");
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-5 mb-5 rounded-bottom-4 shadow-sm">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold mb-3">
                🎓 Campus Collaborative Platform
              </span>
              <h1 className="display-4 fw-bold mb-3">
                Share Resources, Exchange Skills & Grow Together
              </h1>
              <p className="lead mb-4 opacity-90">
                EduCycle connects students within your institution to donate, lend, or swap academic resources and offer peer-to-peer tutoring seamlessly.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/resources" className="btn btn-warning btn-lg fw-bold text-dark px-4 shadow">
                  Browse Resources
                </Link>
                <Link to="/skills" className="btn btn-outline-light btn-lg fw-semibold px-4">
                  Explore Peer Skills
                </Link>
              </div>
            </div>
            <div className="col-lg-5 text-center">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Students Collaboration"
                className="img-fluid rounded-4 shadow-lg border border-3 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="container mb-5">
        <div className="row g-3 text-center">
          <div className="col-md-3 col-6">
            <div className="p-3 bg-white rounded-3 shadow-sm border">
              <h3 className="fw-bold text-primary mb-1">500+</h3>
              <p className="text-muted small mb-0">Resources Shared</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3 bg-white rounded-3 shadow-sm border">
              <h3 className="fw-bold text-success mb-1">320+</h3>
              <p className="text-muted small mb-0">Skill Sessions</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3 bg-white rounded-3 shadow-sm border">
              <h3 className="fw-bold text-info mb-1">1,200+</h3>
              <p className="text-muted small mb-0">Active Students</p>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="p-3 bg-white rounded-3 shadow-sm border">
              <h3 className="fw-bold text-warning mb-1">100%</h3>
              <p className="text-muted small mb-0">Campus Sustainable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Resources */}
      <section className="container mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-primary fw-bold text-uppercase small">Academic Marketplace</span>
            <h2 className="fw-bold mb-0">Trending Resources</h2>
          </div>
          <Link to="/resources" className="btn btn-outline-primary fw-semibold">
            View All <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {resources.length > 0 ? (
              resources.slice(0, 4).map((item) => (
                <div className="col-lg-3 col-md-6" key={item.id || item.resourceId}>
                  <ResourceCard resource={item} onRequest={(res) => handleRequestClick(res, 'resource')} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted py-4">No resources available at the moment.</div>
            )}
          </div>
        )}
      </section>

      {/* Featured Skills */}
      <section className="container mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <span className="text-success fw-bold text-uppercase small">Peer Learning</span>
            <h2 className="fw-bold mb-0">Featured Skills This Week</h2>
          </div>
          <Link to="/skills" className="btn btn-outline-success fw-semibold">
            Explore All Skills <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status"></div>
          </div>
        ) : (
          <div className="row g-4">
            {skills.length > 0 ? (
              skills.slice(0, 4).map((skill) => (
                <div className="col-lg-3 col-md-6" key={skill.id || skill.skillId}>
                  <SkillCard skill={skill} onRequest={(sk) => handleRequestClick(sk, 'skill')} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted py-4">No skill offers available right now.</div>
            )}
          </div>
        )}
      </section>

      <RequestModal
        show={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        item={selectedItem}
        type={modalType}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Home;
