import 'react-toastify/dist/ReactToastify.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { useAdminContext } from './context/AdminContext';
import { useDoctorContext } from './context/DoctorContext';
import { AddDoctor } from './pages/admin/AddDoctor';
import { AllAppointments } from './pages/admin/AllAppointments';
import { Dashboard } from './pages/admin/Dashboard';
import { DoctorsList } from './pages/admin/DoctorsList';
import { DoctorAppointments } from './pages/doctor/DoctorAppointments';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorProfile } from './pages/doctor/DoctorProfile';
import { Login } from './pages/Login';

export const App = () => {
  const { adminToken } = useAdminContext();
  const { doctorToken } = useDoctorContext();

  return (
    <div className='bg-[#f8f9fd]'>
      {adminToken || doctorToken ? (
        <>
          <Navbar />

          <div className='flex items-start'>
            <Sidebar />

            <Routes>
              {/* Admin Routes */}
              {adminToken && (
                <Route path='/' element={<Navigate to='/admin-dashboard' />} />
              )}
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/all-appointments' element={<AllAppointments />} />
              <Route path='/doctors-list' element={<DoctorsList />} />

              {/* Doctor Routes */}
              {doctorToken && (
                <Route path='/' element={<Navigate to='/doctor-dashboard' />} />
              )}
              <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
              <Route path='/doctor-profile' element={<DoctorProfile />} />
              <Route
                path='/doctor-appointments'
                element={<DoctorAppointments />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </div>
  );
};
