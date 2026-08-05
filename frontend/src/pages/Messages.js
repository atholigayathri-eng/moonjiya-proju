import React, { useState, useEffect } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import MessageBox from '../components/MessageBox';
import { requestService } from '../services/requestService';
import { messageService } from '../services/miscServices';
import { useNotification } from '../context/NotificationContext';

const Messages = () => {
  const { showError } = useNotification();

  const [matches, setMatches] = useState([]);
  const [activeMatch, setActiveMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const [inc, out] = await Promise.all([
          requestService.getMyIncomingRequests(),
          requestService.getMySentRequests()
        ]);
        const acceptedInc = (inc || []).filter(r => r.status === 'ACCEPTED').map(r => ({
          requestId: r.id,
          peerName: r.requesterName || 'Student Peer',
          title: r.itemTitle || 'Resource Exchange',
          contactRevealed: true,
          peerEmail: r.requesterEmail,
          peerPhone: r.requesterPhone,
          type: r.type
        }));

        const acceptedOut = (out || []).filter(r => r.status === 'ACCEPTED').map(r => ({
          requestId: r.id,
          peerName: r.ownerName || 'Campus Peer',
          title: r.itemTitle || 'Resource Request',
          contactRevealed: true,
          peerEmail: r.ownerEmail,
          peerPhone: r.ownerPhone,
          type: r.type
        }));

        const allMatches = [...acceptedInc, ...acceptedOut];
        setMatches(allMatches);
        if (allMatches.length > 0) {
          setActiveMatch(allMatches[0]);
        }
      } catch (err) {
        showError("Failed to load chat contacts.");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!activeMatch) return;
    const fetchChat = async () => {
      try {
        const data = await messageService.getChatHistory(activeMatch.requestId);
        const userStr = localStorage.getItem('user');
        const currentUser = userStr ? JSON.parse(userStr) : null;
        const currentUserId = currentUser?.id || currentUser?.userId;

        const mappedMessages = (data || []).map(m => ({
          ...m,
          isMine: m.sender?.userId === currentUserId || m.senderId === currentUserId
        }));
        setMessages(mappedMessages);
      } catch (err) {
        console.error("Failed to load chat history", err);
      }
    };
    fetchChat();
  }, [activeMatch]);

  const handleSendMessage = async (text) => {
    if (!activeMatch) return;
    try {
      const userStr = localStorage.getItem('user');
      const currentUser = userStr ? JSON.parse(userStr) : null;
      const currentUserId = currentUser?.id || currentUser?.userId || 1;

      const newMsg = {
        requestId: activeMatch.requestId,
        senderId: currentUserId,
        type: activeMatch.type || 'resource',
        messageText: text,
        timestamp: new Date().toISOString(),
        isMine: true
      };
      await messageService.sendMessage(newMsg);
      setMessages((prev) => [...prev, newMsg]);
    } catch (err) {
      showError("Failed to send message.");
    }
  };

  return (
    <AnimatedPage className="container py-5">
      <h2 className="fw-extrabold text-dark mb-4 d-none d-md-block" style={{ letterSpacing: '-0.02em' }}>In-App Campus Messaging</h2>
      <div className="row g-0 g-md-4" style={{ height: 'calc(100vh - 180px)', minHeight: '520px' }}>
        {/* Contacts Sidebar */}
        <div className={`col-md-4 h-100 ${activeMatch ? 'd-none d-md-block' : 'd-block'}`}>
          <div className="glass-card h-100 p-0 overflow-hidden d-flex flex-column">
            <div className="p-4 bg-white bg-opacity-60 border-bottom border-subtle fw-bold text-dark">
              <i className="bi bi-people-fill me-2 text-primary"></i>Accepted Matches ({matches.length})
            </div>
            <div className="card-body p-0 overflow-auto flex-grow-1">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border spinner-border-sm text-primary"></div>
                </div>
              ) : matches.length > 0 ? (
                <div className="list-group list-group-flush">
                  {matches.map((match, idx) => (
                    <button
                      key={idx}
                      className={`list-group-item list-group-item-action p-3.5 border-bottom border-subtle text-start transition-hover ${
                        activeMatch?.requestId === match.requestId ? 'bg-primary-subtle' : ''
                      }`}
                      style={{
                        backgroundColor: activeMatch?.requestId === match.requestId ? 'var(--primary-light)' : 'transparent',
                        borderLeft: activeMatch?.requestId === match.requestId ? '4px solid var(--primary-color)' : 'none'
                      }}
                      onClick={() => setActiveMatch(match)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="avatar-circle text-white fw-bold rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{ width: '40px', height: '40px', background: 'var(--primary-gradient)' }}
                        >
                          {match.peerName.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <h6 className="fw-bold mb-0 text-dark text-truncate">{match.peerName}</h6>
                          <small className="text-muted text-truncate d-block">{match.title}</small>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted p-4 small">
                  No active matches found. Connect with peers via Resource or Skill requests to start chatting!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className={`col-md-8 h-100 ${!activeMatch ? 'd-none d-md-block' : 'd-block'}`}>
          <MessageBox
            activeMatch={activeMatch}
            messages={messages}
            onSendMessage={handleSendMessage}
            onBack={() => setActiveMatch(null)}
          />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Messages;
