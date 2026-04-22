# Appointment Management App

A full-stack appointment booking system for a barbershop/beauty salon. Users can register, browse services, and book appointments. Admins can manage all appointments from a dedicated panel.

This is a **learning project** built to practice and improve skills in **Vue 3**, **Tailwind CSS**, **MongoDB**, **Express**, **REST APIs**, and **full-stack architecture**.

## Features

- **User Authentication** - Sign up with email verification, login with JWT, and password reset via email
- **Appointment Booking** - Select up to 3 services, pick a date and available time slot, and confirm
- **My Appointments** - View, edit, and cancel upcoming appointments
- **Admin Panel** - Admin users can view and manage all scheduled appointments
- **Email Notifications** - Automatic emails for account verification, password reset, and appointment changes
- **Protected Routes** - JWT-based middleware on both frontend and backend to guard private resources

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | Reactive UI framework using the Composition API |
| [Vue Router](https://router.vuejs.org/) | Client-side routing with navigation guards |
| [Pinia](https://pinia.vuejs.org/) | State management for user, services, and appointments |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for styling |
| [Vite](https://vite.dev/) | Build tool and dev server with HMR |
| [Axios](https://axios-http.com/) | HTTP client with request/response interceptors |
| [FormKit](https://formkit.com/) | Form building and validation |
| [vue-tailwind-datepicker](https://github.com/elreco/vue-tailwind-datepicker) | Date picker component |
| [vue-toast-notification](https://github.com/niconiconainu/vue-toast-notification) | Toast notifications for user feedback |
| [date-fns](https://date-fns.org/) | Date utility functions |

### Backend

| Technology | Purpose |
|---|---|
| [Express 5](https://expressjs.com/) | Web framework for the REST API |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | NoSQL database with ODM for data modeling |
| [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken) | Token-based authentication |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Secure password hashing |
| [Nodemailer](https://nodemailer.com/) | Email sending for verification and notifications |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |
| [cors](https://github.com/expressjs/cors) | Cross-origin request handling |
| [date-fns](https://date-fns.org/) | Date formatting utilities |

## Project Structure

```
├── backend/
│   ├── config/          # Database and email transport configuration
│   ├── controllers/     # Route handlers (auth, appointments, services, users)
│   ├── data/            # Seed data for beauty services
│   ├── emails/          # Email templates (verification, password reset, notifications)
│   ├── middelware/      # JWT authentication middleware
│   ├── models/          # Mongoose schemas (User, Appointment, Services)
│   ├── routes/          # Express route definitions
│   ├── utils/           # Helpers (JWT generation, validation, token generation)
│   └── index.js         # Server entry point
│
├── frontend/
│   └── src/
│       ├── api/         # Axios API calls (AuthAPI, AppointmentAPI, ServicesAPI)
│       ├── components/  # Reusable components (Appointment, ServiceItem, etc.)
│       ├── helpers/     # Date formatting and currency utilities
│       ├── lib/         # Axios instance with auth interceptors
│       ├── router/      # Vue Router config with auth guards
│       ├── stores/      # Pinia stores (user, services, appointments)
│       ├── views/       # Page components organized by feature
│       ├── App.vue      # Root component
│       └── main.js      # App initialization
```

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check API process status and MongoDB connection |
| GET | `/api/health` | Same health check under the API namespace |

The health response also reports whether the email service has the required SMTP configuration, without exposing secrets.

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/sign-up` | Register a new user |
| GET | `/confirm-account/:token` | Verify email address |
| POST | `/login` | Login and receive JWT |
| POST | `/forgot-password` | Request password reset email |
| GET | `/new-password/:token` | Verify reset token |
| POST | `/new-password/:token` | Set new password |
| GET | `/user` | Get authenticated user (requires JWT) |
| GET | `/admin` | Verify admin role (requires JWT) |

### Services (`/api/services`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | List all services |
| GET | `/:id` | Get service by ID |
| POST | `/` | Create service (requires JWT) |
| PUT | `/:id` | Update service (requires JWT) |
| DELETE | `/:id` | Delete service (requires JWT) |

### Appointments (`/api/appointments`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create appointment (requires JWT) |
| GET | `/?date=dd/MM/yyyy` | Get booked time slots for a date (requires JWT) |
| GET | `/:id` | Get appointment details (requires JWT) |
| PUT | `/:id` | Update appointment (requires JWT) |
| DELETE | `/:id` | Cancel appointment (requires JWT) |

### Users (`/api/users`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/:user/appointments` | Get user's upcoming appointments (requires JWT) |

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas account (or local MongoDB instance)
- Mailtrap account (or any SMTP service for email testing)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Seed the database with default services (optional):
   ```bash
   npm run seed:import
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:8000`.

#### SMTP Configuration (Brevo)

For Brevo SMTP, configure these environment variables in your backend deployment:

```env
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your-brevo-smtp-login
EMAIL_PASS=your-brevo-smtp-key
EMAIL_FROM=no-reply@appointments.braianbarraza.com
EMAIL_FROM_NAME=Appointments Management App
EMAIL_REPLY_TO=your-contact-email@example.com
ADMIN_EMAIL=your-admin-email@example.com
FRONTEND_URL=https://appointments.braianbarraza.com
ADDITIONAL_FRONTEND_URLS=https://appointments-management-app.netlify.app
```

`EMAIL_HOST` and `EMAIL_PORT` default to Brevo's SMTP relay if omitted, but keeping them explicit in production makes the deployment easier to audit. Never commit real SMTP keys to the repository.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

### Production Domains

- Frontend: `https://appointments.braianbarraza.com`
- Backend API: `https://appoitment-management-app.onrender.com/api`
- Sender email: `no-reply@appointments.braianbarraza.com`

### Netlify Custom Domain

In Netlify, add `appointments.braianbarraza.com` as a custom domain for the frontend site and update the frontend environment variable:

```env
VITE_API_URL=https://appoitment-management-app.onrender.com/api
```

After the custom domain is active, make sure the backend `FRONTEND_URL` also points to `https://appointments.braianbarraza.com`.

During the migration, you can keep both frontend domains allowed in Render with:

```env
FRONTEND_URL=https://appointments.braianbarraza.com
ADDITIONAL_FRONTEND_URLS=https://appointments-management-app.netlify.app
```

### Available Scripts

**Backend:**
| Script | Description |
|---|---|
| `npm run dev` | Start with file watching |
| `npm start` | Start production server |
| `npm run seed:import` | Import default beauty services |
| `npm run seed:destroy` | Remove all seeded data |

**Frontend:**
| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint and auto-fix with ESLint |
| `npm run format` | Format code with Prettier |

## What I Learned

This project was built as a hands-on exercise to learn and practice:

- **Vue 3 Composition API** - Reactive state with `ref`, `computed`, `watch`, and lifecycle hooks
- **Pinia** - Centralized state management with stores, actions, and getters
- **Vue Router** - Navigation guards, nested routes, dynamic route params, and lazy loading
- **Tailwind CSS** - Utility-first styling, responsive design, and custom components
- **REST API Design** - CRUD operations, route organization, and middleware patterns
- **MongoDB + Mongoose** - Schema design, references between models, population, and queries
- **Authentication Flow** - JWT generation/verification, password hashing with bcrypt, and protected routes
- **Email Integration** - Transactional emails with Nodemailer for account verification and notifications
- **Full-Stack Architecture** - Connecting a Vue SPA to an Express API with Axios interceptors and CORS
- **Error Handling** - Consistent error responses, try/catch patterns, and client-side error feedback

## Author

**Braian Barraza**

## License

ISC
