# Copilot Instructions for Bhojan_Pjt (Zomato_Clone)

## Project Overview
This is a full-stack clone of Zomato, organized into `frontend` (React + Vite) and `backend` (Node.js + Express + MongoDB). The codebase is split for clear separation of concerns:
- **frontend/**: User/admin dashboard, authentication, modals, and UI components
- **backend/**: REST API, authentication, admin/user models, email, and token utilities

## Architecture & Data Flow
- **Frontend** communicates with backend via API calls (see `frontend/src/config/api.jsx`).
- **Backend** exposes REST endpoints (see `backend/src/routes/`) and uses controllers for business logic.
- **MongoDB** is used for persistence, configured in `backend/src/config/db.js`.
- **Cloudinary** integration for media uploads (`backend/src/config/cloudinary.js`).

## Key Patterns & Conventions
- **React Components**: Organized by feature (e.g., `userDashboard/`, `admin/`). Modals are nested under relevant features.
- **Context API**: Used for authentication state (`frontend/src/context/AuthContext.jsx`).
- **Controllers**: Backend logic is split by domain (auth, user, admin) in `backend/src/controllers/`.
- **Middlewares**: Auth middleware in `backend/src/middlewares/authMiddleware.js` protects routes.
- **Token Generation**: Utility in `backend/src/utils/genAuthToken.js`.
- **Email Utility**: `backend/src/utils/sendEmail.js` for notifications (e.g., OTP).

## Developer Workflows
- **Frontend**
  - Start: `npm run dev` in `frontend/`
  - Build: `npm run build` in `frontend/`
  - Lint: `npm run lint` (ESLint config in `frontend/eslint.config.js`)
- **Backend**
  - Start: `node index.js` or `npm start` in `backend/`
  - Environment: Configure `.env` for DB, JWT, email, and cloudinary keys
  - Seed admin: Run `backend/src/seeders/adminSeeder.js` to create initial admin

## Integration Points
- **API Endpoints**: Defined in `backend/src/routes/`, consumed in `frontend/src/config/api.jsx`
- **Authentication**: JWT-based, with tokens generated and verified in backend
- **Cloudinary**: Used for image uploads from frontend forms

## Project-Specific Notes
- **Modals**: All modal components are grouped by feature for maintainability
- **Admin/User Separation**: Distinct models, controllers, and routes for admin and user logic
- **Seeders**: Use seeders for initial data population (admin)

## Example: Adding a New API Endpoint
1. Create controller logic in `backend/src/controllers/`
2. Add route in `backend/src/routes/`
3. Update frontend API calls in `frontend/src/config/api.jsx`

## References
- Frontend entry: `frontend/src/main.jsx`
- Backend entry: `backend/index.js`
- Auth context: `frontend/src/context/AuthContext.jsx`
- API config: `frontend/src/config/api.jsx`
- DB config: `backend/src/config/db.js`

---
For questions or unclear conventions, review this file and the referenced key files. Update this doc as new patterns emerge.
