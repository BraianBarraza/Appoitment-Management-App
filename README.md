# Appointment Management App

Full-stack application to manage appointments with authentication, service management, and user scheduling. The project is split into a **backend** (Node.js/Express REST API) and a **frontend** (Vue 3 + Vite SPA).

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Helpful Scripts](#helpful-scripts)
- [Main Endpoints](#main-endpoints)

## Features
- Sign up and login with JWT.
- Account confirmation and password recovery via email.
- Service management (CRUD).
- Appointment management (create, update, delete, query by date).
- User appointment overview.

## Tech Stack
**Backend**
- Node.js, Express, MongoDB (Mongoose)
- JWT authentication
- Nodemailer for email notifications

**Frontend**
- Vue 3 + Vite
- Pinia for state management
- Tailwind CSS and FormKit for UI

## Project Structure
```
.
├── backend
│   ├── config
│   ├── controllers
│   ├── data
│   ├── emails
│   ├── middelware
│   ├── models
│   ├── routes
│   ├── utils
│   └── index.js
└── frontend
    ├── public
    └── src
```

## Prerequisites
- Node.js (recommended >= 20)
- MongoDB running locally or remotely
- An SMTP provider for transactional emails

## Getting Started
### Backend
```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:8000` (or the port you configure).

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173` by default.

## Helpful Scripts
**Backend**
- `npm run dev`: start server with reload
- `npm run dev:postman`: allow requests without a defined origin
- `npm run seed:import`: load seed data
- `npm run seed:destroy`: remove seed data

**Frontend**
- `npm run build`: production build
- `npm run preview`: preview production build
- `npm run lint`: lint + fix
- `npm run format`: format with Prettier

## Main Endpoints
Base URL: `/api`

- **Auth**
  - `POST /auth/sign-up`
  - `GET /auth/confirm-account/:token`
  - `POST /auth/login`
  - `POST /auth/forgot-password`
  - `GET /auth/new-password/:token`
  - `POST /auth/new-password/:token`
  - `GET /auth/user` (JWT required)
  - `GET /auth/admin` (JWT required)

- **Services**
  - `GET /services`
  - `POST /services`
  - `GET /services/:id`
  - `PUT /services/:id`
  - `DELETE /services/:id`

- **Appointments** (JWT required)
  - `POST /appointments`
  - `GET /appointments?date=YYYY-MM-DD`
  - `GET /appointments/:id`
  - `PUT /appointments/:id`
  - `DELETE /appointments/:id`

- **Users** (JWT required)
  - `GET /users/:user/appointments`
