import React, { useState } from 'react';

const MessageBox = ({ activeMatch, messages, onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  if (!activeMatch) {
    return (
      <div className="card h-100 border-0 shadow-sm d-flex align-items-center justify-content-center text-center p-5">
        <i className="bi bi-chat-square-dots text-secondary display-1 mb-3"></i>
        <h5 className="text-muted fw-bold">Select a Match to start messaging</h5>
        <p className="text-secondary small">Messages are enabled once a request is accepted by both parties.</p>
      </div>
    );
  }

  return (
    <div className="card h-100 border-0 shadow-sm d-flex flex-column">
      <div className="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <div className="avatar-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%' }}>
            {activeMatch.peerName ? activeMatch.peerName.charAt(0).toUpperCase() : 'P'}
          </div>
          <div>
            <h6 className="fw-bold mb-0">{activeMatch.peerName || 'Campus Peer'}</h6>
            <small className="text-muted">{activeMatch.title || activeMatch.skillName}</small>
          </div>
        </div>

        {activeMatch.contactRevealed && (
          <div className="badge bg-success-subtle text-success border border-success p-2">
            <i className="bi bi-telephone-fill me-1"></i> Contact: {activeMatch.peerPhone || activeMatch.peerEmail}
          </div>
        )}
      </div>

      <div className="card-body overflow-auto flex-grow-1 p-3 bg-light" style={{ maxHeight: '450px' }}>
        {messages && messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex flex-column mb-3 ${msg.isMine ? 'align-items-end' : 'align-items-start'}`}
            >
              <div
                className={`p-3 rounded-3 max-w-75 ${
                  msg.isMine ? 'bg-primary text-white' : 'bg-white shadow-sm text-dark'
                }`}
                style={{ maxWidth: '75%' }}
              >
                <p className="mb-1 text-break">{msg.messageText || msg.text}</p>
                <small className={`d-block text-end ${msg.isMine ? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '0.7rem' }}>
                  {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                </small>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted my-5">
            <i className="bi bi-chat-dots fs-3 d-block mb-2"></i>
            No messages yet. Send a greeting to kick off your interaction!
          </div>
        )}
      </div>

      <div className="card-footer bg-white border-top p-3">
        <form onSubmit={handleSubmit} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-4 fw-semibold">
            <i className="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageBox;
