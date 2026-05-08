import { NavLink } from 'react-router-dom';

import { assets } from '../assets/assets';
import { useAdminContext } from '../context/AdminContext';
import { useDoctorContext } from '../context/DoctorContext';

export const Sidebar = () => {
  const { adminToken } = useAdminContext();
  const { doctorToken } = useDoctorContext();

  return (
    <div className='bg-white border-border border-r h-[calc(100vh-63px)]'>
      {adminToken && (
        <ul className='mt-5 text-[#515151]'>
          <NavLink
            to='/admin-dashboard'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive && 'border-primary bg-[#f2f3ff] border-r-4'
              }`
            }
          >
            <img src={assets.home_icon} alt='home-icon' />
            <p className='max-sm:hidden'>Dashboard</p>
          </NavLink>

          <NavLink
            to='/all-appointments'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive && 'border-primary bg-[#f2f3ff] border-r-4'
              }`
            }
          >
            <img src={assets.appointment_icon} alt='appointment-icon' />
            <p className='max-sm:hidden'>All Appointments</p>
          </NavLink>

          <NavLink
            to='/add-doctor'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive && 'border-primary bg-[#f2f3ff] border-r-4'
              }`
            }
          >
            <img src={assets.add_icon} alt='add-icon' />
            <p className='max-sm:hidden'>Add Doctor</p>
          </NavLink>

          <NavLink
            to='/doctors-list'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive && 'border-primary bg-[#f2f3ff] border-r-4'
              }`
            }
          >
            <img src={assets.people_icon} alt='people-icon' />
            <p className='max-sm:hidden'>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {doctorToken && (
        <ul className='mt-5 text-[#515151]'>
          <NavLink
            to='/doctor-dashboard'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive && 'border-primary bg-[#f2f3ff] border-r-4'
              }`
            }
          >
            <img src={assets.home_icon} alt='home-icon' />
            <p className='max-sm:hidden'>Dashboard</p>
          </NavLink>

          <NavLink
            to='/doctor-appointments'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive && 'border-primary bg-[#f2f3ff] border-r-4'
              }`
            }
          >
            <img src={assets.appointment_icon} alt='appointment-icon' />
            <p className='max-sm:hidden'>Appointments</p>
          </NavLink>

          <NavLink
            to='/doctor-profile'
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive && 'border-primary bg-[#f2f3ff] border-r-4'
              }`
            }
          >
            <img src={assets.people_icon} alt='people-icon' />
            <p className='max-sm:hidden'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};
