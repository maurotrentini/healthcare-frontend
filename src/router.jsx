import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";

import DoctorList from "./pages/Doctors/DoctorList";
import DoctorForm from "./pages/Doctors/DoctorForm";

import ClinicList from "./pages/Clinics/ClinicList";
import ClinicForm from "./pages/Clinics/ClinicForm";

import PatientList from "./pages/Patients/PatientList";
import PatientForm from "./pages/Patients/PatientForm";

import AppointmentList from "./pages/Appointments/AppointmentList";
import AppointmentForm from "./pages/Appointments/AppointmentForm";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout route: wraps all pages */}
        <Route path="/" element={<Layout />}>
          {/* Index route for "/" */}
          <Route index element={<Home />} />

          {/* Doctors */}
          <Route path="doctors" element={<DoctorList />} />
          <Route path="doctors/new" element={<DoctorForm />} />
          <Route path="doctors/:id/edit" element={<DoctorForm />} />

          {/* Clinics */}
          <Route path="clinics" element={<ClinicList />} />
          <Route path="clinics/new" element={<ClinicForm />} />
          <Route path="clinics/:id/edit" element={<ClinicForm />} />

          {/* Patients */}
          <Route path="patients" element={<PatientList />} />
          <Route path="patients/new" element={<PatientForm />} />
          <Route path="patients/:id/edit" element={<PatientForm />} />

          {/* Appointments */}
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="appointments/new" element={<AppointmentForm />} />
          <Route path="appointments/:id/edit" element={<AppointmentForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
