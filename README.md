# 🏥 Healthcare Admin Dashboard

A simple **React** frontend for managing appointments, doctors, clinics, and patients in a healthcare system.
It interacts with a **Hydra-compliant REST API** (e.g. Symfony 7 + API Platform) to perform CRUD operations.

Built with modern tools like **Vite**, **Material UI**, and **React Hook Form**.

---

## 🧰 Tech Stack

- **React 19** (with Hooks)
- **Vite** (for fast dev & hot reload)
- **Material UI (MUI)** (for UI components & theming)
- **React Router v6** (for routing)
- **React Hook Form** (for form state & validation)
- **Axios** (via a lightweight API wrapper)
- **Hydra-powered API** (HATEOAS-compliant backend, such as [API Platform](https://api-platform.com/))

---

## 📁 Project Structure

```
/healthcare-frontend
├── /api               # Axios instance & helpers
├── /components        # Reusable UI components (e.g. EntityList, Layout)
├── /pages             # Pages for Appointments, Doctors, Clinics, Patients
├── App.jsx            # Root component
├── main.jsx           # App bootstrap + ThemeProvider
└── router.jsx         # Client-side routes
```

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have:

- **Node.js** v18+
- **npm** v9+

> 🐳 Docker is _not_ required — this project runs fine locally via `npm`.

---

### 📦 Installation

```bash
git clone https://github.com/maurotrentini/healthcare-frontend.git
cd healthcare-frontend
npm install
```

---

### ▶️ Running the App

```bash
npm run dev
```

- App runs at: `http://localhost:5173` or `http://localhost:3000` (unless those ports are already in use, in which case it will auto-select and show a different port number)
- Make sure your **backend API** is running at `http://localhost:8000` (or update the API base URL accordingly).
- The API must support **CORS** for frontend access.

---

## ✨ Features

- View, create, and edit:

  - Appointments
  - Doctors
  - Clinics
  - Patients

- Form validation with `React Hook Form`
- Loading spinners for form and list views
- Pagination for appointment listings
- Responsive layout with MUI’s AppBar + Drawer
- Fast local development with Vite’s hot reload

---

## ⚠️ Notes

This prototype is optimized for **rapid development and demonstration purposes**.

Due to time constraints, the following features are **out of scope for now**:

- Global error boundaries
- Authentication or user access control
- Production build optimization
- Unit or integration tests

---

## 📄 License

MIT © [Mauro Trentini](https://github.com/maurotrentini)
