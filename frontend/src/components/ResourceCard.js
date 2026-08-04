import React from 'react';

const ResourceCard = ({ resource, onRequest }) => {
  const getBadgeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'donate': return 'bg-success';
      case 'lend': return 'bg-primary';
      case 'exchange': return 'bg-info text-dark';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="card h-100 shadow-sm border-0 transition-hover">
      <div className="position-relative">
        <img
          src={resource.imageUrl || "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80"}
          className="card-img-top object-fit-cover"
          alt={resource.title}
          style={{ height: '180px' }}
        />
        <span className={`badge position-absolute top-0 end-0 m-2 px-3 py-2 ${getBadgeColor(resource.exchangeType)}`}>
          {resource.exchangeType ? resource.exchangeType.toUpperCase() : 'DONATE'}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-uppercase fw-bold text-muted" style={{ fontSize: '0.75rem' }}>
            {resource.category || 'General'}
          </small>
          <span className="badge bg-light text-dark border">
            Condition: {resource.condition || 'Good'}
          </span>
        </div>

        <h5 className="card-title text-truncate fw-bold mb-2" title={resource.title}>
          {resource.title}
        </h5>

        <p className="card-text text-secondary small flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {resource.description}
        </p>

        <div className="mt-3 pt-2 border-top d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-person-circle fs-5 text-secondary"></i>
            <span className="small text-muted text-truncate" style={{ maxWidth: '120px' }}>
              {resource.user ? `${resource.user.firstName || ''} ${resource.user.lastName || ''}`.trim() : (resource.ownerName || resource.userName || 'Student')}
            </span>
          </div>

          {onRequest && (
            <button
              className="btn btn-sm btn-primary px-3 fw-semibold"
              onClick={() => onRequest && onRequest(resource)}
            >
              <i className="bi bi-send me-1"></i>Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
