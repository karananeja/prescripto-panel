import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { api } from '../../lib/api-client';
import { formatDate } from '../../lib/utils';

export const DoctorDashboard = () => {
  const { currencySymbol } = useAppContext();

  const [dashboardData, setDashboardData] = useState<DoctorDashboardData>({
    earnings: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/doctor/get-dashboard-data');
        setDashboardData(res.data.dashboardData);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const payload = { appointmentId };
      const res = await api.post('/doctor/cancel-appointment', payload);
      toast.success(res.data.message);
      setDashboardData((prev) => ({
        ...prev,
        latestAppointments: prev.latestAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, cancelled: true }
            : appointment
        ),
      }));
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  const handleCompleteAppointment = async (appointmentId: string) => {
    try {
      const payload = { appointmentId };
      const res = await api.post('/doctor/complete-appointment', payload);
      toast.success(res.data.message);
      setDashboardData((prev) => ({
        ...prev,
        latestAppointments: prev.latestAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, isCompleted: true }
            : appointment
        ),
      }));
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  return (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 border-2 border-border rounded min-w-52 hover:scale-105 transition-all duration-500 cursor-pointer'>
          <img className='w-14' src={assets.earning_icon} alt='earning-icon' />
          <div>
            <p className='font-semibold text-gray-600 text-xl'>
              {currencySymbol} {dashboardData.earnings}
            </p>
            <p className='text-gray-400 text-sm'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 border-2 border-border rounded min-w-52 hover:scale-105 transition-all duration-500 cursor-pointer'>
          <img
            className='w-14'
            src={assets.appointments_icon}
            alt='appointments-icon'
          />
          <div>
            <p className='font-semibold text-gray-600 text-xl'>
              {dashboardData.appointments}
            </p>
            <p className='text-gray-400 text-sm'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 border-2 border-border rounded min-w-52 hover:scale-105 transition-all duration-500 cursor-pointer'>
          <img
            className='w-14'
            src={assets.patients_icon}
            alt='patients-icon'
          />
          <div>
            <p className='font-semibold text-gray-600 text-xl'>
              {dashboardData.patients}
            </p>
            <p className='text-gray-400 text-sm'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 mt-10 p-4 border border-border rounded-t'>
          <img src={assets.list_icon} alt='list-icon' />
          <p className='font-semibold'>Latest Appointments</p>
        </div>

        <div className='pt-4 border border-border border-t-0 rounded-b'>
          {dashboardData.latestAppointments.length > 0 ? (
            dashboardData.latestAppointments.map((appointment) => (
              <div
                className='flex items-center gap-3 hover:bg-gray-50 px-6 py-3 transition-all duration-300'
                key={appointment._id}
              >
                <img
                  className='bg-gray-200 rounded-full w-10'
                  src={appointment.userData.image}
                  alt='user-image'
                />
                <div className='flex-1 text-sm'>
                  <p className='font-medium text-gray-800'>
                    {appointment.userData.name}
                  </p>
                  <p className='text-gray-600'>
                    Booking on {formatDate(appointment.slotDate)}
                  </p>
                </div>

                {appointment.cancelled ? (
                  <p className='flex items-center h-10 font-medium text-red-400 text-xs'>
                    Cancelled
                  </p>
                ) : appointment.isCompleted ? (
                  <p className='flex items-center h-10 font-medium text-green-400 text-xs'>
                    Completed
                  </p>
                ) : (
                  <div className='flex'>
                    <img
                      className='size-10 cursor-pointer'
                      src={assets.cancel_icon}
                      alt='cancel-icon'
                      onClick={() => handleCancelAppointment(appointment._id)}
                    />
                    <img
                      className='size-10 cursor-pointer'
                      src={assets.tick_icon}
                      alt='tick-icon'
                      onClick={() => handleCompleteAppointment(appointment._id)}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className='flex justify-center items-center h-[54vh] text-zinc-400 text-sm text-center'>
              No appointments found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
