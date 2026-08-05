import React, { useRef } from 'react';
import { gsap } from 'gsap';

const SkillCard = ({ skill, onRequest }) => {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -6,
        scale: 1.015,
        boxShadow: '0 20px 40px -15px rgba(5, 79, 163, 0.18)',
        borderColor: 'rgba(5, 79, 163, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: '0 8px 32px 0 rgba(5, 79, 163, 0.07)',
        borderColor: 'rgba(5, 79, 163, 0.12)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="card glass-card h-100 border-0 d-flex flex-column"
    >
      <div className="card-body d-flex flex-column p-4 flex-grow-1">
        {/* Category & Level Badges Row */}
        <div className="d-flex justify-content-between align-items-center mb-3 gap-2" style={{ minHeight: '30px' }}>
          <span className="badge-pill-accent text-truncate" style={{ maxWidth: '68%' }} title={skill.category || 'Skill'}>
            <i className="bi bi-award-fill me-1 flex-shrink-0"></i>
            <span className="text-truncate">{skill.category || 'Skill'}</span>
          </span>
          <span className="badge bg-light text-secondary border px-2.5 py-1.5 fw-semibold flex-shrink-0" style={{ fontSize: '0.72rem' }}>
            {skill.level || 'Intermediate'}
          </span>
        </div>

        {/* Skill Title */}
        <h5 
          className="card-title fw-bold text-dark mb-2" 
          title={skill.skillName} 
          style={{ 
            fontSize: '1.08rem', 
            letterSpacing: '-0.01em',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {skill.skillName}
        </h5>

        {/* Description Clamped */}
        <p 
          className="card-text text-muted small mb-3" 
          style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden',
            minHeight: '2.5rem', 
            lineHeight: '1.5' 
          }}
        >
          {skill.description}
        </p>

        {/* Mode & Availability Block */}
        <div 
          className="p-3 rounded-4 mb-4 small" 
          style={{ background: 'var(--primary-light)', border: '1px solid rgba(5, 79, 163, 0.1)', minHeight: '4.2rem' }}
        >
          <div className="d-flex align-items-center gap-2 mb-1 text-primary fw-semibold text-truncate">
            <i className="bi bi-display fs-6 flex-shrink-0"></i>
            <span className="text-truncate">Mode: {skill.teachingMethod || 'One-on-One'}</span>
          </div>
          <div className="d-flex align-items-center gap-2 text-secondary text-truncate">
            <i className="bi bi-clock fs-6 flex-shrink-0"></i>
            <span className="text-truncate">Availability: {skill.availability || 'Flexible'}</span>
          </div>
        </div>

        {/* Card Footer Aligned at Bottom */}
        <div className="mt-auto pt-3 border-top border-subtle d-flex align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2 overflow-hidden" style={{ flex: '1', minWidth: 0 }}>
            <div 
              className="d-flex align-items-center justify-content-center text-primary rounded-circle flex-shrink-0"
              style={{ width: '34px', height: '34px', background: 'var(--primary-light)' }}
            >
              <i className="bi bi-mortarboard-fill fs-6"></i>
            </div>
            <div className="overflow-hidden">
              <div className="small fw-bold text-dark text-truncate">
                {skill.tutorName || skill.userName || 'Peer Tutor'}
              </div>
              {skill.rating && (
                <div className="small text-warning fw-semibold" style={{ fontSize: '0.72rem' }}>
                  <i className="bi bi-star-fill me-1"></i>{skill.rating} / 5
                </div>
              )}
            </div>
          </div>

          {onRequest && (
            <button
              className="btn btn-sm btn-outline-primary px-3 py-2 fw-bold d-inline-flex align-items-center gap-1 flex-shrink-0"
              onClick={() => onRequest && onRequest(skill)}
            >
              <i className="bi bi-person-plus-fill"></i>
              <span>Learn</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
