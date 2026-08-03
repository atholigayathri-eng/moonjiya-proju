import React, { useState } from 'react';

const RequestModal = ({ show, onClose, item, type, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!show || !item) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        itemId: item.id || item.resourceId || item.skillId,
        message,
        scheduledDate: type === 'skill' ? scheduledDate : undefined,
      });
      setMessage('');
      setScheduledDate('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal show d-block tab-modal-backdrop" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title fw-bold">
              <i className={`bi ${type === 'resource' ? 'bi-box-seam' : 'bi-mortarboard'} me-2`}></i>
              Request {type === 'resource' ? 'Resource' : 'Skill Session'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="bg-light p-3 rounded mb-3">
                <h6 className="fw-bold mb-1">{item.title || item.skillName}</h6>
                <small className="text-muted">
                  Owner/Tutor: {item.ownerName || item.tutorName || item.userName || 'Campus Peer'}
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Note to Peer</label>
                <textarea
                  className="form-control"
                  rows="3"
                  required
                  placeholder="Introduce yourself and explain why you're requesting this item or session..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              {type === 'skill' && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">Preferred Schedule / Date</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary fw-semibold" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
