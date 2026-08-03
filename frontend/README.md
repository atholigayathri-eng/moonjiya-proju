# EduCycle - Frontend Application

EduCycle is a collaborative student community platform designed for campus resource sharing (donate, lend, swap academic books, tools, equipment) and peer-to-peer skill exchange (programming, math, languages, design).

This React application represents the production-ready frontend for the EduCycle project, built according to the specification outlined in `EDUCYCLE_COMPLETE.md`.

---

## 🚀 Tech Stack

- **Framework**: React 18.x
- **Routing**: React Router v6
- **State Management**: Context API (Auth Context & Notification Context)
- **HTTP Client**: Axios (with Bearer Token interceptors)
- **Styling**: Bootstrap 5 + Bootstrap Icons + Custom CSS
- **Design**: Responsive, mobile-first design

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js         # Responsive Navigation Bar
│   │   ├── Footer.js         # Site Footer
│   │   ├── ResourceCard.js   # Resource card component
│   │   ├── SkillCard.js      # Peer Skill offer component
│   │   ├── RequestModal.js   # Exchange request modal dialog
│   │   └── MessageBox.js     # Live chat box component
│   │
│   ├── context/
│   │   ├── AuthContext.js    # JWT token & user state management
│   │   └── NotificationContext.js # Global toast alerts
│   │
│   ├── pages/
│   │   ├── Home.js           # Homepage with stats & trending items
│   │   ├── Login.js          # User Login
│   │   ├── Register.js       # User Registration
│   │   ├── Dashboard.js      # User Dashboard & Request Center
│   │   ├── Resources.js      # Resource exchange module & filters
│   │   ├── Skills.js         # Skill exchange module & filters
│   │   ├── Profile.js        # User profile viewing & editing
│   │   ├── Messages.js       # In-app chat interface
│   │   ├── AdminPanel.js     # Admin moderation & stats panel
│   │   └── NotFound.js       # 404 page
│   │
│   ├── services/
│   │   ├── api.js            # Axios instance configuration
│   │   ├── authService.js    # Authentication API calls
│   │   ├── resourceService.js# Resource CRUD API calls
│   │   ├── skillService.js   # Skill CRUD API calls
│   │   ├── userService.js    # User profile API calls
│   │   ├── requestService.js# Request status management API calls
│   │   └── miscServices.js   # Chat, Ratings, and Admin API calls
│   │
│   ├── css/
│   │   └── index.css         # Global custom styles
│   │
│   ├── App.js                # Main router configuration
│   └── index.js              # Application entry point
│
├── .env.example
├── package.json
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v16.x or higher
- **npm**: v8.x or higher

### Installation

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root of `frontend` (or copy `.env.example`):
   ```properties
   REACT_APP_API_URL=http://localhost:8080/api
   ```

### Running the Application

To launch the React application in development mode:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🔗 Backend API Connection

The API calls are configured to hit `http://localhost:8080/api` by default. Ensure your Spring Boot backend is running on port 8080.

Key API endpoints configured in `src/services/`:
- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Resources**: `/api/resources`
- **Skills**: `/api/skills`
- **Requests**: `/api/resource-requests`, `/api/skill-requests`, `/api/my-requests`
- **Messages**: `/api/messages`
- **Admin**: `/api/admin/statistics`, `/api/admin/users`, `/api/admin/resources`
