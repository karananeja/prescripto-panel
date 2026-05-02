import { NavLink } from 'react-router-dom';

import { assets } from '../assets/assets';
import { useAdminContext } from '../context/AdminContext';

export const Sidebar = () => {
  const { adminToken } = useAdminContext();

  return (
    <div className='bg-white border-border border-r h-[calc(100vh-63px)]'>
      {adminToken ? (
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
            <p>Dashboard</p>
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
            <p>All Appointments</p>
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
            <p>Add Doctor</p>
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
            <p>Doctors List</p>
          </NavLink>
        </ul>
      ) : (
        'Doctor'
      )}
    </div>
  );
};
