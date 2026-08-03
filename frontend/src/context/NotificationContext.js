import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', timeout = 5000) => {
    const id = Date.now() + Math.random();
    const newNotif = { id, message, type };
    setNotifications((prev) => [...prev, newNotif]);

    if (timeout) {
      setTimeout(() => {
        removeNotification(id);
      }, timeout);
    }
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const showSuccess = (msg) => addNotification(msg, 'success');
  const showError = (msg) => addNotification(msg, 'danger');
  const showInfo = (msg) => addNotification(msg, 'info');
  const showWarning = (msg) => addNotification(msg, 'warning');

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification, showSuccess, showError, showInfo, showWarning }}
    >
      {children}
      {/* Global Toast Container */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1090 }}>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`toast show align-items-center text-bg-${notif.type} border-0 mb-2 shadow`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body">{notif.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => removeNotification(notif.id)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
