import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DoctorList from './pages/Doctors/DoctorList';
import DoctorForm from './pages/Doctors/DoctorForm';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/new" element={<DoctorForm />} />
        <Route path="/doctors/:id/edit" element={<DoctorForm />} />
        {/* TODO: other entities */}
      </Routes>
    </BrowserRouter>
  );
}