import React from 'react';

const SkillCard = ({ skill, onRequest }) => {
  const getLevelBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-success';
      case 'intermediate': return 'bg-warning text-dark';
      case 'advanced': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0 transition-hover">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-light text-primary border fw-semibold">
            {skill.category || 'Skill'}
          </span>
          <span className={`badge ${getLevelBadge(skill.level)}`}>
            {skill.level || 'Intermediate'}
          </span>
        </div>

        <h5 className="card-title fw-bold mb-2 text-truncate" title={skill.skillName}>
          {skill.skillName}
        </h5>

        <p className="card-text text-secondary small flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {skill.description}
        </p>

        <div className="bg-light p-2 rounded mb-3 small text-muted">
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="bi bi-display text-primary"></i>
            <span>Mode: {skill.teachingMethod || 'One-on-One'}</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-clock text-primary"></i>
            <span>Availability: {skill.availability || 'Flexible'}</span>
          </div>
        </div>

        <div className="pt-2 border-top d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-person-badge fs-5 text-secondary"></i>
            <div>
              <div className="small fw-semibold text-truncate" style={{ maxWidth: '110px' }}>
                {skill.tutorName || skill.userName || 'Peer Tutor'}
              </div>
              {skill.rating && (
                <div className="small text-warning" style={{ fontSize: '0.75rem' }}>
                  <i className="bi bi-star-fill me-1"></i>{skill.rating} / 5
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn-sm btn-outline-primary px-3 fw-semibold"
            onClick={() => onRequest && onRequest(skill)}
          >
            <i className="bi bi-person-plus me-1"></i>Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
