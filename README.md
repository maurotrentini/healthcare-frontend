# Healthcare Admin Dashboard

This is a simple frontend application for managing appointments, doctors, clinics, and patients in a healthcare system. The app is built using **React**, powered by **Vite**, and styled with **Material UI (MUI)**. It interacts with a RESTful backend API (following the Hydra spec) to perform CRUD operations.

## 🔧 Technologies Used

- **React** (with Hooks)
- **Vite** (for fast development & hot reload)
- **Material UI (MUI)** (for UI components and styling)
- **React Router v6** (for client-side routing)
- **React Hook Form** (for form handling)
- **Axios** (via a simple API wrapper)
- **Hydra-powered API** (HATEOAS-compliant backend, such as API Platform)

## 📁 Project Structure

- /src
- /api ← Axios config and helpers
- /components ← Reusable components like EntityList and Layout
- /pages ← Appointments, Doctors, Clinics, Patients (List + Form)
- App.jsx
- main.jsx
- router.jsx

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- **Node.js v18+**
- **npm v9+**

> 🐳 Docker is not required to run this project.

### Installation

```bash
git clone https://github.com/maurotrentini/healthcare-frontend.git
cd healthcare-frontend
npm install
```

### Running the App

```bash
npm run dev
```

This will start the development server

### Notes

⚠️ Make sure your backend API is also running (e.g. on http://localhost:8000) and configured to allow CORS.

✨ Features
View, create and edit, appointments, doctors, patients, and clinics

Form validation with controlled inputs

Loading indicators for form and list views

Responsive navigation with MUI AppBar + Drawer layout

Pagination (for appointments)

Local development with Vite’s fast refresh

🔚 Notes
This app is designed for quick development and demo purposes. Some features (such as global error boundaries, authentication, or production optimization) are out of scope for now.
