import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { useAdminContext } from './context/AdminContext';
import { useDoctorContext } from './context/DoctorContext';
import { AddDoctor } from './pages/admin/AddDoctor';
import { AllAppointments } from './pages/admin/AllAppointments';
import { Dashboard } from './pages/admin/Dashboard';
import { DoctorsList } from './pages/admin/DoctorsList';
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
              <Route path='/' element={<></>} />
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/all-appointments' element={<AllAppointments />} />
              <Route path='/doctors-list' element={<DoctorsList />} />
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
