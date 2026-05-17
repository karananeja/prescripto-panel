import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { api } from '../../lib/api-client';
import { formatDate } from '../../lib/utils';

const DashboardSkeleton = () => {
  return (
    <div className='m-5 animate-pulse'>
      {/* Stats Cards Skeleton */}
      <div className='flex flex-wrap gap-3'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className='flex items-center gap-2 bg-white p-4 border-2 border-border rounded min-w-52'
          >
            <div className='bg-gray-200 rounded size-14' />

            <div className='flex flex-col gap-2'>
              <div className='bg-gray-200 rounded w-24 h-5' />
              <div className='bg-gray-100 rounded w-16 h-3' />
            </div>
          </div>
        ))}
      </div>

      {/* Latest Appointments Skeleton */}
      <div className='bg-white mt-10'>
        {/* Header */}
        <div className='flex items-center gap-2.5 p-4 border border-border rounded-t'>
          <div className='bg-gray-200 rounded size-6' />
          <div className='bg-gray-200 rounded w-40 h-4' />
        </div>

        {/* Appointment List */}
        <div className='pt-4 border border-border border-t-0 rounded-b'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='flex items-center gap-3 px-6 py-3'>
              {/* Avatar */}
              <div className='bg-gray-200 rounded-full size-10' />

              {/* Text */}
              <div className='flex flex-col flex-1 gap-2'>
                <div className='bg-gray-200 rounded w-40 h-4' />
                <div className='bg-gray-100 rounded w-32 h-3' />
              </div>

              {/* Action Buttons */}
              <div className='flex gap-2'>
                <div className='bg-gray-200 rounded size-10' />
                <div className='bg-gray-200 rounded size-10' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DoctorDashboard = () => {
  const { currencySymbol } = useAppContext();

  const [dashboardData, setDashboardData] = useState<DoctorDashboardData>({
    earnings: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  });
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsDashboardLoading(true);
        const res = await api.get('/doctor/get-dashboard-data');
        setDashboardData(res.data.dashboardData);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      } finally {
        setIsDashboardLoading(false);
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

  return isDashboardLoading ? (
    <DashboardSkeleton />
  ) : (
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
