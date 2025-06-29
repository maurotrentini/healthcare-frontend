import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorList from './pages/Doctors/DoctorList';
import DoctorForm from './pages/Doctors/DoctorForm';
import ClinicsList from './pages/Clinics/ClinicList';
import ClinicsForm from './pages/Clinics/ClinicForm';
import PatientList from './pages/Patients/PatientList';
import PatientForm from './pages/Patients/PatientForm';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
         {/* Doctors */}
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/new" element={<DoctorForm />} />
        <Route path="/doctors/:id/edit" element={<DoctorForm />} />

        {/* Clinics */}
        <Route path="/clinics" element={<ClinicsList />} />
        <Route path="/clinics/new" element={<ClinicsForm />} />
        <Route path="/clinics/:id/edit" element={<ClinicsForm />} />

        {/* Patients */}
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/new" element={<PatientForm />} />
        <Route path="/patients/:id/edit" element={<PatientForm />} />
      </Routes>
    </BrowserRouter>
  );
}