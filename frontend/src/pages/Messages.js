import React, { useState, useEffect } from 'react';
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
        // Filter only accepted requests (matches)
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
    <div className="container py-4">
      <h2 className="fw-bold mb-4 d-none d-md-block">In-App Campus Messaging</h2>
      <div className="row g-0 g-md-4" style={{ height: 'calc(100vh - 140px)', minHeight: '500px' }}>
        {/* Contacts Sidebar */}
        <div className={`col-md-4 h-100 ${activeMatch ? 'd-none d-md-block' : 'd-block'}`}>
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-header bg-white fw-bold py-3 border-bottom">
              <i className="bi bi-people me-2 text-primary"></i>Accepted Matches
            </div>
            <div className="card-body p-0 overflow-auto">
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border spinner-border-sm text-primary"></div>
                </div>
              ) : matches.length > 0 ? (
                <div className="list-group list-group-flush">
                  {matches.map((match, idx) => (
                    <button
                      key={idx}
                      className={`list-group-item list-group-item-action p-3 border-bottom text-start ${
                        activeMatch?.requestId === match.requestId ? 'active bg-primary-subtle border-primary' : ''
                      }`}
                      onClick={() => setActiveMatch(match)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="avatar-circle bg-primary text-white fw-bold rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                          {match.peerName.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <h6 className="fw-bold mb-0 text-truncate">{match.peerName}</h6>
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
    </div>
  );
};

export default Messages;
