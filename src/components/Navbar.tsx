import { useNavigate } from 'react-router-dom';

import { assets } from '../assets/assets';
import { useAdminContext } from '../context/AdminContext';
import { useDoctorContext } from '../context/DoctorContext';

export const Navbar = () => {
  const { adminToken, setAdminToken } = useAdminContext();
  const { doctorToken, setDoctorToken } = useDoctorContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    setAdminToken('');
    setDoctorToken('');
    navigate('/');
  };

  return (
    <div className='flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-border border-b'>
      <div className='flex items-center gap-2 text-xs'>
        <img
          className='w-36 sm:w-40 cursor-pointer'
          src={assets.admin_logo}
          alt='admin-logo'
        />
        <p className='px-2.5 py-0.5 border border-gray-500 rounded-full text-gray-600'>
          {adminToken && 'Admin'}
          {doctorToken && 'Doctor'}
        </p>
      </div>
      <button
        className='bg-primary px-10 py-2 rounded-full text-white text-sm'
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
