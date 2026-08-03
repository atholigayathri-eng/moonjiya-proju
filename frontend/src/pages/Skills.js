import React, { useState, useEffect } from 'react';
import SkillCard from '../components/SkillCard';
import RequestModal from '../components/RequestModal';
import { skillService } from '../services/skillService';
import { requestService } from '../services/requestService';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Skills = () => {
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');

  // Modal State
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  // New Skill Form
  const [newSkill, setNewSkill] = useState({
    skillName: '',
    category: 'Programming',
    level: 'Intermediate',
    teachingMethod: 'One-on-One',
    availability: '3-5 hours/week',
    description: ''
  });

  const skillCategories = ['Programming', 'Mathematics', 'Languages', 'Design', 'Music', 'Sports', 'Arts', 'Other'];

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await skillService.getAll({ category, level, search });
      setSkills(data.content || data || []);
    } catch (err) {
      showError("Failed to fetch skill offerings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, level]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSkills();
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await skillService.create(newSkill);
      showSuccess("Skill offer created successfully!");
      setShowPostModal(false);
      setNewSkill({
        skillName: '',
        category: 'Programming',
        level: 'Intermediate',
        teachingMethod: 'One-on-One',
        availability: '3-5 hours/week',
        description: ''
      });
      fetchSkills();
    } catch (err) {
      showError("Failed to post skill offer.");
    }
  };

  const handleRequestSubmit = async (data) => {
    try {
      await requestService.createSkillRequest(data);
      showSuccess("Skill learning request sent successfully!");
    } catch (err) {
      showError(err.response?.data?.message || "Request failed.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold mb-1">Peer Skill Exchange</h2>
          <p className="text-secondary mb-0">Learn programming, mathematics, foreign languages, and design from fellow students</p>
        </div>
        {isAuthenticated && (
          <button className="btn btn-success fw-bold px-4" onClick={() => setShowPostModal(true)}>
            <i className="bi bi-plus-lg me-2"></i>Offer a Skill
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
                placeholder="Search by skill name, tech stack, language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {skillCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select" value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">All Expertise Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-secondary w-100 fw-semibold">Go</button>
          </div>
        </form>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status"></div>
        </div>
      ) : (
        <div className="row g-4">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div className="col-lg-3 col-md-6" key={skill.id || skill.skillId}>
                <SkillCard skill={skill} onRequest={(sk) => setSelectedSkill(sk)} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5 bg-light rounded-3 border">
              <i className="bi bi-mortarboard display-4 text-muted d-block mb-3"></i>
              <h5>No skills found</h5>
              <p className="text-muted small">Be the first student to offer a skill in this category!</p>
            </div>
          )}
        </div>
      )}

      {/* Modal to Post New Skill */}
      {showPostModal && (
        <div className="modal show d-block tab-modal-backdrop" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow border-0">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold"><i className="bi bi-mortarboard me-2"></i>Offer a Skill to Peers</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowPostModal(false)}></button>
              </div>
              <form onSubmit={handlePostSubmit}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">Skill / Subject Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        placeholder="e.g. Python Programming & Data Science basics"
                        value={newSkill.skillName}
                        onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Category</label>
                      <select
                        className="form-select"
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      >
                        {skillCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Expertise Level</label>
                      <select
                        className="form-select"
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                      >
                        <option value="Beginner">Beginner Friendly</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Teaching Format</label>
                      <select
                        className="form-select"
                        value={newSkill.teachingMethod}
                        onChange={(e) => setNewSkill({ ...newSkill, teachingMethod: e.target.value })}
                      >
                        <option value="One-on-One">One-on-One Tutoring</option>
                        <option value="Group Study">Group Study Session</option>
                        <option value="Async Support">Async Code Review / Q&A</option>
                      </select>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Weekly Availability</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Weekends, 2-4 hrs"
                        value={newSkill.availability}
                        onChange={(e) => setNewSkill({ ...newSkill, availability: e.target.value })}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold">Description & Teaching Overview</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        required
                        placeholder="Describe what you will cover, prerequisites, and how you prefer to organize study sessions..."
                        value={newSkill.description}
                        onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPostModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success fw-bold">Publish Skill Offer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      <RequestModal
        show={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        item={selectedSkill}
        type="skill"
        onSubmit={handleRequestSubmit}
      />
    </div>
  );
};

export default Skills;
