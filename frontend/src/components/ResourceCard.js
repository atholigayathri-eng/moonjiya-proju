import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80";

const ResourceCard = ({ resource, onRequest }) => {
  const cardRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(resource.imageUrl || DEFAULT_IMAGE);

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
      className="card glass-card h-100 border-0 overflow-hidden d-flex flex-column"
    >
      {/* Image Container with Fixed Height & Ratio */}
      <div 
        className="position-relative overflow-hidden w-100" 
        style={{ height: '190px', background: '#e2e8f0', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}
      >
        <img
          src={imgSrc}
          onError={() => setImgSrc(DEFAULT_IMAGE)}
          className="w-100 h-100 object-fit-cover"
          alt={resource.title}
          style={{ objectPosition: 'center' }}
        />
        <span 
          className="badge position-absolute top-0 end-0 m-3 px-3 py-2 text-white fw-bold shadow-sm"
          style={{ background: 'var(--primary-gradient)', fontSize: '0.72rem', letterSpacing: '0.04em' }}
        >
          {resource.exchangeType ? resource.exchangeType.toUpperCase() : 'DONATE'}
        </span>
      </div>

      <div className="card-body d-flex flex-column p-4 flex-grow-1">
        {/* Category & Condition Row */}
        <div className="d-flex justify-content-between align-items-center mb-3 gap-2" style={{ minHeight: '30px' }}>
          <span className="badge-pill-accent text-truncate" style={{ maxWidth: '68%' }} title={resource.category || 'General'}>
            <i className="bi bi-tag-fill me-1 flex-shrink-0"></i>
            <span className="text-truncate">{resource.category || 'General'}</span>
          </span>
          <span className="badge bg-light text-secondary border flex-shrink-0 text-uppercase" style={{ fontSize: '0.72rem' }}>
            {resource.condition || 'Good'}
          </span>
        </div>

        {/* Title */}
        <h5 
          className="card-title fw-bold text-dark mb-2" 
          title={resource.title} 
          style={{ 
            fontSize: '1.08rem', 
            letterSpacing: '-0.01em', 
            display: '-webkit-box', 
            WebkitLineClamp: 1, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}
        >
          {resource.title}
        </h5>

        {/* Description Clamped */}
        <p 
          className="card-text text-muted small mb-4" 
          style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden', 
            minHeight: '2.5rem', 
            lineHeight: '1.5' 
          }}
        >
          {resource.description}
        </p>

        {/* Card Footer Push to Bottom */}
        <div className="mt-auto pt-3 border-top border-subtle d-flex align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2 overflow-hidden" style={{ flex: '1', minWidth: 0 }}>
            <div 
              className="d-flex align-items-center justify-content-center text-primary rounded-circle flex-shrink-0"
              style={{ width: '32px', height: '32px', background: 'var(--primary-light)' }}
            >
              <i className="bi bi-person-fill fs-6"></i>
            </div>
            <span className="small text-muted fw-semibold text-truncate">
              {resource.user ? `${resource.user.firstName || ''} ${resource.user.lastName || ''}`.trim() : (resource.ownerName || resource.userName || 'Student')}
            </span>
          </div>

          {onRequest && (
            <button
              className="btn btn-sm btn-primary px-3 py-2 fw-bold d-inline-flex align-items-center gap-1 flex-shrink-0 shadow-sm"
              onClick={() => onRequest && onRequest(resource)}
            >
              <i className="bi bi-send-fill"></i>
              <span>Request</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
