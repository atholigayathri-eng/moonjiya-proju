import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { requestService } from '../services/requestService';
import { resourceService } from '../services/resourceService';
import { skillService } from '../services/skillService';
import { useNotification } from '../context/NotificationContext';
import ResourceCard from '../components/ResourceCard';
import SkillCard from '../components/SkillCard';

const Dashboard = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [activeTab, setActiveTab] = useState('overview');
  const [myResources, setMyResources] = useState([]);
  const [mySkills, setMySkills] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [resData, skillData, incData, outData] = await Promise.all([
        resourceService.getAll({ userId: user?.id }),
        skillService.getAll({ userId: user?.id }),
        requestService.getMyIncomingRequests(),
        requestService.getMySentRequests(),
      ]);

      setMyResources(resData.content || resData || []);
      setMySkills(skillData.content || skillData || []);
      setIncomingRequests(incData || []);
      setOutgoingRequests(outData || []);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestStatusUpdate = async (id, type, status) => {
    try {
      if (type === 'resource') {
        await requestService.updateResourceRequestStatus(id, status);
      } else {
        await requestService.updateSkillRequestStatus(id, status);
      }
      showSuccess(`Request ${status.toLowerCase()} successfully!`);
      fetchDashboardData();
    } catch (err) {
      showError("Failed to update status.");
    }
  };

  return (
    <div className="container py-4">
      {/* Header Banner */}
      <div className="bg-white border rounded-4 p-4 shadow-sm mb-4 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div className="d-flex align-items-center gap-3">
          <div className="avatar-circle bg-primary text-white display-6 fw-bold rounded-circle d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
            {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'S'}
          </div>
          <div>
            <h3 className="fw-bold mb-1">Hello, {user?.firstName || user?.name || 'Student'}!</h3>
            <p className="text-secondary small mb-0">
              <i className="bi bi-building me-1"></i>{user?.college || 'Campus Member'} • {user?.department || 'Department'}
            </p>
          </div>
        </div>

        <div className="d-flex gap-2">
          <div className="text-center px-3 py-2 bg-light rounded border">
            <span className="d-block fw-bold fs-5 text-primary">{myResources.length}</span>
            <small className="text-muted">Resources</small>
          </div>
          <div className="text-center px-3 py-2 bg-light rounded border">
            <span className="d-block fw-bold fs-5 text-success">{mySkills.length}</span>
            <small className="text-muted">Skills</small>
          </div>
          <div className="text-center px-3 py-2 bg-light rounded border">
            <span className="d-block fw-bold fs-5 text-warning">{incomingRequests.length}</span>
            <small className="text-muted">Requests</small>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-pills mb-4 gap-2 border-bottom pb-3">
        <li className="nav-item">
          <button className={`nav-link fw-semibold ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <i className="bi bi-speedometer2 me-2"></i>Overview
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link fw-semibold ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => setActiveTab('resources')}>
            <i className="bi bi-box-seam me-2"></i>My Resources ({myResources.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link fw-semibold ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
            <i className="bi bi-mortarboard me-2"></i>My Skills ({mySkills.length})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link fw-semibold ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveTab('requests')}>
            <i className="bi bi-inbox me-2"></i>Requests Center ({incomingRequests.length + outgoingRequests.length})
          </button>
        </li>
      </ul>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white fw-bold py-3 border-bottom d-flex justify-content-between align-items-center">
                    <span><i className="bi bi-arrow-down-left-circle me-2 text-warning"></i>Incoming Requests ({incomingRequests.length})</span>
                    <button className="btn btn-sm btn-link text-decoration-none" onClick={() => setActiveTab('requests')}>View All</button>
                  </div>
                  <div className="card-body p-0">
                    {incomingRequests.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {incomingRequests.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="list-group-item p-3 d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-semibold">{req.requesterName || 'Student Peer'}</div>
                              <small className="text-muted">{req.itemTitle || req.message}</small>
                            </div>
                            <span className={`badge ${req.status === 'ACCEPTED' ? 'bg-success' : 'bg-warning text-dark'}`}>
                              {req.status || 'PENDING'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-muted p-4 small">No pending incoming requests.</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white fw-bold py-3 border-bottom d-flex justify-content-between align-items-center">
                    <span><i className="bi bi-arrow-up-right-circle me-2 text-primary"></i>Sent Requests ({outgoingRequests.length})</span>
                    <button className="btn btn-sm btn-link text-decoration-none" onClick={() => setActiveTab('requests')}>View All</button>
                  </div>
                  <div className="card-body p-0">
                    {outgoingRequests.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {outgoingRequests.slice(0, 3).map((req, idx) => (
                          <li key={idx} className="list-group-item p-3 d-flex justify-content-between align-items-center">
                            <div>
                              <div className="fw-semibold">{req.itemTitle || 'Requested Item'}</div>
                              <small className="text-muted">Owner: {req.ownerName || 'Campus Member'}</small>
                            </div>
                            <span className={`badge ${req.status === 'ACCEPTED' ? 'bg-success' : 'bg-secondary'}`}>
                              {req.status || 'PENDING'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-muted p-4 small">No outgoing requests sent yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="row g-4">
              {myResources.length > 0 ? (
                myResources.map((item) => (
                  <div className="col-lg-3 col-md-6" key={item.id || item.resourceId}>
                    <ResourceCard resource={item} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5 bg-white rounded border">
                  <p className="text-muted">You haven't posted any resources yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="row g-4">
              {mySkills.length > 0 ? (
                mySkills.map((skill) => (
                  <div className="col-lg-3 col-md-6" key={skill.id || skill.skillId}>
                    <SkillCard skill={skill} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5 bg-white rounded border">
                  <p className="text-muted">You haven't offered any skills yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="row g-4">
              <div className="col-md-6">
                <h5 className="fw-bold mb-3">Incoming Exchange Requests</h5>
                {incomingRequests.length > 0 ? (
                  incomingRequests.map((req, idx) => (
                    <div key={idx} className="card border-0 shadow-sm mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <h6 className="fw-bold mb-0">{req.requesterName || 'Student Peer'}</h6>
                          <span className={`badge ${req.status === 'ACCEPTED' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {req.status || 'PENDING'}
                          </span>
                        </div>
                        <p className="text-secondary small mb-3">{req.message}</p>
                        {req.status !== 'ACCEPTED' && req.status !== 'REJECTED' && (
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-success px-3 fw-semibold"
                              onClick={() => handleRequestStatusUpdate(req.id, req.type || 'resource', 'ACCEPTED')}
                            >
                              Accept Request
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger px-3"
                              onClick={() => handleRequestStatusUpdate(req.id, req.type || 'resource', 'REJECTED')}
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted small">No incoming requests.</div>
                )}
              </div>

              <div className="col-md-6">
                <h5 className="fw-bold mb-3">Your Sent Requests</h5>
                {outgoingRequests.length > 0 ? (
                  outgoingRequests.map((req, idx) => (
                    <div key={idx} className="card border-0 shadow-sm mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <h6 className="fw-bold mb-0">{req.itemTitle || 'Requested Resource'}</h6>
                          <span className={`badge ${req.status === 'ACCEPTED' ? 'bg-success' : 'bg-secondary'}`}>
                            {req.status || 'PENDING'}
                          </span>
                        </div>
                        <p className="text-secondary small mb-0">Note: {req.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted small">No sent requests.</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
