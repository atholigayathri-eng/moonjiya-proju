# EduCycle - Collaborative Platform for Academic Resource and Skill Exchange

**Group 13**
- Ahal Dev M S
- Gayathri Atholi
- Aaditya V
- Akshara M V

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Project Objectives](#project-objectives)
4. [Features & Functions](#features--functions)
5. [Tech Stack](#tech-stack)
6. [Project Architecture](#project-architecture)
7. [Database Schema (ER Diagram)](#database-schema-er-diagram)
8. [API Endpoints](#api-endpoints)
9. [Project Structure](#project-structure)
10. [Setup & Installation](#setup--installation)
11. [Development Workflow](#development-workflow)
12. [Deployment](#deployment)

---

## Executive Summary

**EduCycle** is a collaborative web platform that enables students to share, donate, lend, or exchange academic resources (textbooks, notes, lab kits, project components) and peer-to-peer skills (programming, languages, mathematics, design) within their educational institution.

### Core Problem
- Students have unused academic resources after completing courses
- Many students cannot afford or access these resources due to financial/availability constraints
- Skills remain siloed instead of being shared peer-to-peer
- Educational waste and sustainability concerns

### Solution
A single integrated application (Spring Boot backend + React frontend) that:
- Allows resource exchange (donate, lend, trade)
- Enables skill sharing between students
- Provides secure communication and matching
- Promotes sustainability and collaborative learning

### Impact
- Reduces financial burden on students
- Promotes environmental sustainability
- Fosters collaborative learning environment
- Enhances peer-to-peer education opportunities
- Creates connected educational community

---

## Problem Statement

Students often possess textbooks, notes, laboratory materials, project components, and other academic resources that become unused after completing a course. At the same time, many students face difficulties in accessing these resources due to financial or availability constraints. Additionally, valuable academic skills (programming, design, languages, mathematics) remain untapped because there's no platform for peer-to-peer knowledge sharing.

Current solutions:
- WhatsApp groups (unorganized, no tracking)
- Facebook marketplace (unsafe, impersonal)
- No platform specifically for students within an institution
- No integrated skill-sharing mechanism

---

## Project Objectives

1. **Create a collaborative student community** where knowledge and resources are shared efficiently
2. **Integrate resource exchange with skill sharing** to maximize learning opportunities
3. **Reduce educational waste** through material reuse and sustainability
4. **Lower educational costs** by enabling resource sharing among peers
5. **Foster continuous learning** through peer-to-peer skill exchange
6. **Enhance student engagement** through a connected, supportive community
7. **Provide secure environment** for student interactions and transactions

---

## Features & Functions

### 1. USER MANAGEMENT

| Feature | Description |
|---------|-------------|
| Registration | Email, password, name, college, department, phone |
| Email Verification | Confirm email before account activation |
| Login/Logout | Secure authentication with JWT |
| User Profile | Avatar, bio, skills offered, resources posted, ratings |
| Profile Editing | Update information, change password |
| Password Reset | Email-based password recovery |
| Dashboard | View my resources, skills, requests, messages |

---

### 2. RESOURCE EXCHANGE MODULE

**Post Resource:**
- Title, description, category, condition (new/good/fair)
- Images/files upload
- Exchange type: donate, lend, or exchange
- Quantity available
- Location/pickup details

**Search & Filter:**
- Search by keyword, category, condition
- Filter by exchange type, availability
- Sort by posted date, popularity

**Resource Management:**
- View resource details and owner info
- Send exchange request with message
- Accept/reject incoming requests
- Update resource status (available/requested/exchanged/returned)
- Delete resource

**Resource Categories:**
- Textbooks, Notes, Lab Kits, Project Components, Lab Equipment, Other

**Status Flow:**
```
Available → Requested → Accepted → Completed/Returned
```

---

### 3. SKILL EXCHANGE MODULE

**Post Skill:**
- Skill name, category, level (beginner/intermediate/advanced)
- Description, teaching method (one-on-one/group/async)
- Availability (hours per week, preferred times)

**Search & Filter:**
- Search by skill name, category, level
- Filter by tutor rating, availability type

**Skill Management:**
- View tutor profile and ratings
- Send learning request with preferred schedule
- Accept/reject incoming learning requests
- Mark session as completed (both parties confirm)
- Cancel ongoing sessions

**Skill Categories:**
- Programming, Mathematics, Languages, Design, Music, Sports, Arts, Other

**Status Flow:**
```
Available → Requested → Accepted → In Progress → Completed
```

---

### 4. MATCHING & COMMUNICATION

**Automated Matching:**
- When request accepted, link requester ↔ owner/tutor
- Display match confirmation to both parties

**In-App Messaging:**
- Send direct messages after match acceptance
- Chat history per match
- Notifications for new messages

**Contact Reveal:**
- Phone number/email visible only after acceptance
- Prevents spam and ensures commitment

**Notifications:**
- New request received
- Request accepted/rejected
- New message
- Session reminder (skills)

---

### 5. RATINGS & REVIEWS

**Post-Exchange Rating:**
- 1-5 star rating for resource exchanged
- Written review/feedback
- Anonymity options

**Post-Skill Rating:**
- 1-5 star rating for tutor/learner
- Written feedback about session quality
- Skill-specific comments

**Profile Display:**
- Average rating shown on user profile
- All reviews visible (with filters)
- Number of exchanges/skills completed

**Safety Features:**
- Block user option
- Report user for inappropriate behavior
- Admin review flagged reports

---

### 6. ADMIN PANEL

| Feature | Functionality |
|---------|--------------|
| Moderate Listings | Review and remove inappropriate posts |
| User Management | View, suspend, or ban accounts |
| Statistics Dashboard | Total resources, skills, completed exchanges |
| Category Management | Add/edit resource & skill categories |
| Reports Review | Handle user complaints and issues |
| Analytics | Track platform usage and trends |

---

### 7. DASHBOARD & HOME

**Homepage:**
- Trending resources feed
- Featured skills this week
- Platform statistics (total resources, completed exchanges)
- Call-to-action buttons

**User Dashboard (after login):**
- My Resources (posted, active, completed)
- My Skills (offered, active sessions, completed)
- Incoming Requests (resources & skills)
- Outgoing Requests (pending & accepted)
- Messages Inbox
- My Ratings & Reviews
- Quick Stats (total exchanges, resources shared, skills learned)

---

### 8. OPTIONAL ADVANCED FEATURES (Phase 2)

- Karma/credit point system
- Wishlist for resources/skills
- Advanced search with location-based filtering
- Calendar integration for skill sessions
- Profile export/statistics download
- Mobile app (React Native)
- Batch uploads for resources
- Analytics dashboard

---

## Tech Stack

### Backend
- **Framework:** Java Spring Boot (v3.x)
- **Build Tool:** Maven
- **Database Driver:** MySQL Connector/J
- **ORM:** Hibernate (via Spring Data JPA)
- **Authentication:** Spring Security + JWT
- **API Documentation:** Swagger/SpringFox

### Frontend
- **Framework:** React (v18.x)
- **Styling:** CSS3 / Bootstrap 5 (or Tailwind CSS)
- **HTTP Client:** Axios
- **State Management:** React Hooks / Context API
- **Routing:** React Router v6
- **UI Components:** React Bootstrap / Material UI

### Database
- **Type:** MySQL (Cloud)
- **Provider:** PlanetScale (free tier)
- **Connection:** JDBC URL from PlanetScale dashboard

### Deployment
- **Frontend:** Antigravity IDE / Vercel / Netlify
- **Backend:** Railway / Render / Heroku (free tier)
- **Database:** PlanetScale (cloud-hosted MySQL)

### Development & Tools
- **Version Control:** Git & GitHub
- **IDE:** IntelliJ IDEA / VS Code
- **API Testing:** Postman
- **Package Manager (Frontend):** npm

---

## Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                            │
│              (HTML, CSS, JS Components)                      │
│                  Running on Port 3000                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP Requests (JSON)
                       │ Axios
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Spring Boot REST API                            │
│           (Controllers, Services, Repositories)              │
│                  Running on Port 8080                        │
│                                                              │
│  ├── User Service          ├── Resource Service             │
│  ├── Skill Service         ├── Request Service              │
│  ├── Rating Service        ├── Message Service              │
│  └── Admin Service         └── Notification Service         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Queries & Updates (JDBC/Hibernate)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              MySQL Database (PlanetScale)                    │
│                                                              │
│  ├── users                 ├── resources                     │
│  ├── skills                ├── skill_requests               │
│  ├── resource_requests     ├── ratings                      │
│  ├── messages              ├── notifications                │
│  └── admin_logs            └── categories                   │
└──────────────────────────────────────────────────────────────┘
```

---

## Database Schema (ER Diagram)

### Entities & Relationships

```
┌─────────────────────┐
│      USERS          │
├─────────────────────┤
│ user_id (PK)        │
│ email               │
│ password_hash       │
│ first_name          │
│ last_name           │
│ phone               │
│ college             │
│ department          │
│ avatar_url          │
│ bio                 │
│ rating              │
│ created_at          │
│ updated_at          │
└──────────┬──────────┘
           │
    ┌──────┴─────────────────────┬────────────────────┐
    │                            │                    │
    ▼                            ▼                    ▼
┌──────────────┐      ┌──────────────────┐   ┌────────────────┐
│  RESOURCES   │      │     SKILLS       │   │  RATINGS       │
├──────────────┤      ├──────────────────┤   ├────────────────┤
│ resource_id  │      │ skill_id (PK)    │   │ rating_id (PK) │
│ user_id (FK) │      │ user_id (FK)     │   │ user_id (FK)   │
│ title        │      │ skill_name       │   │ rated_user_id  │
│ description  │      │ category         │   │ rating_type    │
│ category     │      │ level            │   │ score          │
│ condition    │      │ description      │   │ review         │
│ exchange_typ │      │ teaching_method  │   │ created_at     │
│ quantity     │      │ availability     │   └────────────────┘
│ status       │      │ rating           │
│ created_at   │      │ created_at       │
│ updated_at   │      │ updated_at       │
└──────┬───────┘      └──────┬───────────┘
       │                     │
       │                     │
       ▼                     ▼
┌────────────────────────────┐   ┌──────────────────────┐
│   RESOURCE_REQUESTS        │   │   SKILL_REQUESTS     │
├────────────────────────────┤   ├──────────────────────┤
│ request_id (PK)            │   │ request_id (PK)      │
│ resource_id (FK)           │   │ skill_id (FK)        │
│ requester_id (FK)          │   │ learner_id (FK)      │
│ owner_id (FK)              │   │ tutor_id (FK)        │
│ message                    │   │ message              │
│ status                     │   │ status               │
│ created_at                 │   │ scheduled_date       │
│ updated_at                 │   │ created_at           │
└────────────────────────────┘   │ updated_at           │
                                 └──────────────────────┘

┌──────────────────────┐
│     MESSAGES         │
├──────────────────────┤
│ message_id (PK)      │
│ sender_id (FK)       │
│ receiver_id (FK)     │
│ request_id (FK)      │
│ message_text         │
│ created_at           │
│ read                 │
└──────────────────────┘

┌──────────────────────┐
│   NOTIFICATIONS      │
├──────────────────────┤
│ notif_id (PK)        │
│ user_id (FK)         │
│ type                 │
│ related_id           │
│ message              │
│ read                 │
│ created_at           │
└──────────────────────┘

┌──────────────────────┐
│   CATEGORIES         │
├──────────────────────┤
│ category_id (PK)     │
│ type (resource/skill)│
│ name                 │
│ description          │
└──────────────────────┘
```

---

## API Endpoints

### Authentication
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
POST   /api/auth/logout            Logout user
POST   /api/auth/verify-email      Verify email
POST   /api/auth/forgot-password   Request password reset
POST   /api/auth/reset-password    Reset password
```

### User Management
```
GET    /api/users/{id}             Get user profile
PUT    /api/users/{id}             Update user profile
DELETE /api/users/{id}             Delete account
GET    /api/users/{id}/resources   Get user's resources
GET    /api/users/{id}/skills      Get user's skills
GET    /api/users/{id}/ratings     Get user's ratings
```

### Resources
```
GET    /api/resources              List all resources (with filters)
POST   /api/resources              Post new resource
GET    /api/resources/{id}         Get resource details
PUT    /api/resources/{id}         Update resource
DELETE /api/resources/{id}         Delete resource
GET    /api/resources/search       Search resources
```

### Skills
```
GET    /api/skills                 List all skills (with filters)
POST   /api/skills                 Post new skill
GET    /api/skills/{id}            Get skill details
PUT    /api/skills/{id}            Update skill
DELETE /api/skills/{id}            Delete skill
GET    /api/skills/search          Search skills
```

### Requests
```
POST   /api/resource-requests      Create resource request
GET    /api/resource-requests/{id} Get request details
PUT    /api/resource-requests/{id} Update request status
DELETE /api/resource-requests/{id} Cancel request

POST   /api/skill-requests         Create skill request
GET    /api/skill-requests/{id}    Get request details
PUT    /api/skill-requests/{id}    Update request status
DELETE /api/skill-requests/{id}    Cancel request

GET    /api/my-requests            Get my incoming requests
GET    /api/my-sent-requests       Get my outgoing requests
```

### Messages
```
GET    /api/messages/{request_id}  Get chat history
POST   /api/messages               Send message
PUT    /api/messages/{id}          Mark as read
DELETE /api/messages/{id}          Delete message
```

### Ratings & Reviews
```
POST   /api/ratings                Post rating/review
GET    /api/ratings/user/{id}      Get user's ratings
PUT    /api/ratings/{id}           Update rating
DELETE /api/ratings/{id}           Delete rating
```

### Admin
```
GET    /api/admin/users            List all users
GET    /api/admin/resources        List all resources (moderation)
GET    /api/admin/reports          Get user reports
POST   /api/admin/suspend-user     Suspend user
DELETE /api/admin/delete-post      Delete inappropriate post
GET    /api/admin/statistics       Platform statistics
```

---

## Project Structure

```
educycle/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── educycle/
│   │   │           ├── EducycleApplication.java    (Main class)
│   │   │           │
│   │   │           ├── controller/
│   │   │           │   ├── AuthController.java
│   │   │           │   ├── UserController.java
│   │   │           │   ├── ResourceController.java
│   │   │           │   ├── SkillController.java
│   │   │           │   ├── RequestController.java
│   │   │           │   ├── MessageController.java
│   │   │           │   ├── RatingController.java
│   │   │           │   └── AdminController.java
│   │   │           │
│   │   │           ├── service/
│   │   │           │   ├── AuthService.java
│   │   │           │   ├── UserService.java
│   │   │           │   ├── ResourceService.java
│   │   │           │   ├── SkillService.java
│   │   │           │   ├── RequestService.java
│   │   │           │   ├── MessageService.java
│   │   │           │   ├── RatingService.java
│   │   │           │   └── NotificationService.java
│   │   │           │
│   │   │           ├── repository/
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── ResourceRepository.java
│   │   │           │   ├── SkillRepository.java
│   │   │           │   ├── ResourceRequestRepository.java
│   │   │           │   ├── SkillRequestRepository.java
│   │   │           │   ├── MessageRepository.java
│   │   │           │   ├── RatingRepository.java
│   │   │           │   └── NotificationRepository.java
│   │   │           │
│   │   │           ├── model/
│   │   │           │   ├── User.java
│   │   │           │   ├── Resource.java
│   │   │           │   ├── Skill.java
│   │   │           │   ├── ResourceRequest.java
│   │   │           │   ├── SkillRequest.java
│   │   │           │   ├── Message.java
│   │   │           │   ├── Rating.java
│   │   │           │   ├── Notification.java
│   │   │           │   └── Category.java
│   │   │           │
│   │   │           ├── dto/
│   │   │           │   ├── UserDTO.java
│   │   │           │   ├── ResourceDTO.java
│   │   │           │   ├── SkillDTO.java
│   │   │           │   └── RequestDTO.java
│   │   │           │
│   │   │           ├── security/
│   │   │           │   ├── JwtTokenProvider.java
│   │   │           │   ├── JwtAuthenticationFilter.java
│   │   │           │   └── SecurityConfig.java
│   │   │           │
│   │   │           ├── exception/
│   │   │           │   ├── ResourceNotFoundException.java
│   │   │           │   ├── UnauthorizedException.java
│   │   │           │   └── GlobalExceptionHandler.java
│   │   │           │
│   │   │           └── util/
│   │   │               └── ValidationUtil.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-prod.properties
│   │       │
│   │       ├── static/                  (React build output goes here)
│   │       │   ├── index.html
│   │       │   ├── css/
│   │       │   ├── js/
│   │       │   └── assets/
│   │       │
│   │       └── templates/               (If using server-rendered templates)
│   │
│   └── test/
│       └── java/
│           └── com/educycle/
│               ├── service/
│               │   ├── UserServiceTest.java
│               │   ├── ResourceServiceTest.java
│               │   └── SkillServiceTest.java
│               │
│               └── controller/
│                   ├── AuthControllerTest.java
│                   ├── ResourceControllerTest.java
│                   └── SkillControllerTest.java
│
├── frontend/                            (React Application)
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── ResourceCard.js
│   │   │   ├── SkillCard.js
│   │   │   ├── RequestModal.js
│   │   │   └── MessageBox.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Resources.js
│   │   │   ├── Skills.js
│   │   │   ├── Profile.js
│   │   │   ├── Messages.js
│   │   │   ├── AdminPanel.js
│   │   │   └── NotFound.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js              (Axios configuration)
│   │   │   ├── authService.js
│   │   │   ├── resourceService.js
│   │   │   ├── skillService.js
│   │   │   └── userService.js
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── NotificationContext.js
│   │   │
│   │   ├── css/
│   │   │   ├── index.css
│   │   │   ├── navbar.css
│   │   │   ├── cards.css
│   │   │   └── responsive.css
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   │
│   ├── package.json
│   ├── .gitignore
│   └── README.md
│
├── pom.xml                          (Maven configuration)
├── .gitignore
├── README.md
└── EDUCYCLE_COMPLETE.md             (This file)
```

---

## Setup & Installation

### Prerequisites
- Java 11+ (JDK)
- Node.js 16+ & npm
- MySQL (PlanetScale account for cloud DB)
- Git
- Maven
- VS Code / IntelliJ IDEA

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/educycle.git
cd educycle
```

### Step 2: Backend Setup

**1. Configure Database Connection**

Edit `src/main/resources/application.properties`:

```properties
# MySQL Connection (PlanetScale)
spring.datasource.url=mysql://[username]:[password]@[host]/educycle?useSSL=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080

# JWT Configuration
jwt.secret=your_secret_key_here_at_least_32_characters_long
jwt.expiration=86400000

# Application Configuration
app.name=EduCycle
app.version=1.0.0
```

**2. Get PlanetScale Connection String**
- Sign up at https://planetscale.com
- Create database `educycle`
- Get connection string from "Connect" button
- Format: `mysql://[user]:[password]@[host]/educycle`

**3. Build & Run Backend**
```bash
# Install dependencies & build
mvn clean install

# Run Spring Boot application
mvn spring-boot:run

# Backend should run on http://localhost:8080
```

### Step 3: Frontend Setup

**1. Install Dependencies**
```bash
cd frontend
npm install
```

**2. Configure API Base URL**

Edit `src/services/api.js`:

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export default API;
```

**3. Start Development Server**
```bash
npm start

# Frontend runs on http://localhost:3000
```

### Step 4: Test the Setup
- Open http://localhost:3000 in browser
- Backend API available at http://localhost:8080/api
- Test endpoints using Postman

---

## Development Workflow

### Git Workflow (Team Collaboration)

```bash
# 1. Sync with main branch
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Make changes and commit
git add .
git commit -m "descriptive message"

# 4. Push to remote
git push origin feature/your-feature-name

# 5. Create Pull Request on GitHub
# (Assign reviewer, merge after approval)

# 6. Update local main
git checkout main
git pull origin main
```

### Team Responsibilities

| Member | Module | Tasks |
|--------|--------|-------|
| **Ahal** | Backend Lead | Spring Boot setup, User Auth, DB Schema, API structure |
| **Gayathri** | Resource Module | Resource entity, CRUD, search, filtering |
| **Aaditya** | Skill Module | Skill entity, CRUD, search, filtering |
| **Akshara** | Frontend + Requests | React components, messaging, request system |

### Daily Standup Checklist
- [ ] What did I complete yesterday?
- [ ] What will I work on today?
- [ ] Any blockers or issues?

### Code Standards
- Java: Follow Google Java Style Guide
- JavaScript: Use ESLint + Prettier
- Commit messages: Use conventional commits (feat:, fix:, docs:)
- Comments: Add JSDoc for functions, JavaDoc for classes
- Testing: Write unit tests for services

---

## Deployment

### Backend Deployment (Railway/Render)

**Option 1: Railway**
1. Sign up at https://railway.app
2. Connect GitHub repository
3. Add MySQL database plugin
4. Set environment variables (JWT_SECRET, DATABASE_URL)
5. Deploy

**Option 2: Render**
1. Sign up at https://render.com
2. Create new Web Service
3. Connect GitHub
4. Set build command: `mvn clean install`
5. Set start command: `java -jar target/educycle-1.0.0.jar`

### Frontend Deployment (Antigravity / Vercel)

**Build React for Production**
```bash
cd frontend
npm run build

# Creates optimized build in 'build/' folder
```

**Deploy to Vercel**
1. Push code to GitHub
2. Sign up at https://vercel.com
3. Import project from GitHub
4. Set environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`
5. Deploy

**Deploy to Antigravity**
- Follow Antigravity IDE documentation for deployment

### Database (PlanetScale)

Already hosted — no additional setup needed. Connection string configured in backend `application.properties`.

### Environment Variables Checklist

**Backend (.env or application.properties):**
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `SERVER_PORT`

**Frontend (.env):**
- `REACT_APP_API_URL`

---

## Running the Complete Application

### Development Environment (All 3 Pieces)

**Terminal 1 - Backend**
```bash
cd educycle
mvn spring-boot:run
# Running on http://localhost:8080
```

**Terminal 2 - Frontend**
```bash
cd educycle/frontend
npm start
# Running on http://localhost:3000
```

**Terminal 3 - Database**
- Already hosted on PlanetScale (no local setup needed)

Open http://localhost:3000 → Frontend loads → Calls backend API → Queries MySQL database

---

## Testing the API

### Using Postman

1. Import API collection
2. Set base URL: `http://localhost:8080/api`
3. Test endpoints (Auth → Users → Resources → Skills)

### Sample Test Flow
1. **Register** → POST `/api/auth/register`
2. **Login** → POST `/api/auth/login` (get JWT token)
3. **Post Resource** → POST `/api/resources` (with JWT header)
4. **Search Resources** → GET `/api/resources?category=notes`
5. **Request Resource** → POST `/api/resource-requests`
6. **Send Message** → POST `/api/messages`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS error | Add CORS config in Spring Boot SecurityConfig |
| Database connection fails | Verify PlanetScale connection string & credentials |
| Frontend can't reach backend | Check API URL in React `.env` file |
| JWT token expired | Extend token expiration in `application.properties` |
| Port 8080/3000 already in use | Kill process or change port in config |

---

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PlanetScale Documentation](https://planetscale.com/docs)
- [JWT Authentication Guide](https://jwt.io/introduction)

---

## Timeline (Suggested)

| Week | Backend | Frontend | Testing |
|------|---------|----------|---------|
| 1-2 | DB design, User auth | Setup, Navbar, Auth pages | Manual testing |
| 3-4 | Resource & Skill modules | Resource/Skill pages | API testing |
| 5-6 | Requests & Messaging | Dashboard, Messages | Integration testing |
| 7-8 | Ratings, Admin panel | Admin panel, Profile | Full system testing |
| 9-10 | Optimization, Deployment | Responsive design | Bug fixes |

---

## Submission Checklist

- [ ] GitHub repository with complete code
- [ ] Database schema documented
- [ ] API endpoints documented (Swagger/Postman)
- [ ] Setup instructions (README.md)
- [ ] Demo video (2-3 minutes)
- [ ] Viva preparation (architecture, challenges, learnings)
- [ ] Deployed and accessible online
- [ ] Test cases documented
- [ ] Code comments and documentation

---

**Last Updated:** August 2026
**Status:** Ready for Development
