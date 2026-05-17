import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { api } from '../../lib/api-client';
import { formatDate, getAge } from '../../lib/utils';

const AppointmentSkeleton = () => {
  return (
    <div className='m-5 w-full max-w-6xl animate-pulse'>
      {/* Title Skeleton */}
      <div className='bg-gray-200 mb-3 rounded w-40 h-7' />

      <div className='bg-white border border-border rounded min-h-[60vh] max-h-[80vh] overflow-y-auto text-sm'>
        {/* Table Header Skeleton */}
        <div className='hidden gap-1 sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col px-6 py-3 border-border border-b'>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className='bg-gray-200 rounded w-16 h-5' />
          ))}
        </div>

        {/* Table Rows Skeleton */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between items-center gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col px-6 py-3 border-border border-b'
          >
            {/* Index */}
            <div className='hidden sm:block bg-gray-200 rounded w-6 h-4' />

            {/* Patient */}
            <div className='flex items-center gap-2'>
              <div className='bg-gray-200 rounded-full size-8' />
              <div className='bg-gray-200 rounded w-24 h-4' />
            </div>

            {/* Payment */}
            <div className='bg-gray-200 rounded-full w-16 h-6' />

            {/* Age */}
            <div className='hidden sm:block bg-gray-200 rounded w-10 h-4' />

            {/* Date & Time */}
            <div className='bg-gray-200 rounded w-40 h-4' />

            {/* Fee */}
            <div className='bg-gray-200 rounded w-14 h-4' />

            {/* Actions */}
            <div className='flex gap-2'>
              <div className='bg-gray-200 rounded size-10' />
              <div className='bg-gray-200 rounded size-10' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AllAppointments = () => {
  const { currencySymbol } = useAppContext();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAppointmentsLoading, setIsAppointmentsLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setIsAppointmentsLoading(true);
        const res = await api.get('/admin/get-appointments');
        setAppointments(res.data.appointments);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      } finally {
        setIsAppointmentsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const payload = { appointmentId };
      const res = await api.post('/admin/cancel-appointment', payload);
      toast.success(res.data.message);
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, cancelled: true }
            : appointment
        )
      );
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  return isAppointmentsLoading ? (
    <AppointmentSkeleton />
  ) : (
    <div className='m-5 w-full max-w-6xl'>
      <p className='mb-3 font-medium text-lg'>All Appointments</p>

      <div className='bg-white border border-border rounded min-h-[60vh] max-h-[80vh] overflow-y-auto text-sm'>
        <div className='hidden gap-1 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col px-6 py-3 border-border border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <div
              key={appointment._id}
              className='flex flex-wrap justify-between items-center gap-1 max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col hover:bg-gray-50 px-6 py-3 border-border border-b transition-all duration-300'
            >
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img
                  className='bg-gray-200 rounded-full w-8'
                  src={appointment.userData.image}
                  alt='user-image'
                />
                <p>{appointment.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>
                {getAge(appointment.userData.dob)}
              </p>
              <p>
                {formatDate(appointment.slotDate)} | {appointment.slotTime}
              </p>
              <div className='flex items-center gap-2'>
                <img
                  className='bg-gray-200 rounded-full w-8'
                  src={appointment.docData.image}
                  alt='doctor-image'
                />
                <p>{appointment.docData.name}</p>
              </div>
              <p>
                {currencySymbol}
                {appointment.amount}
              </p>

              {appointment.cancelled ? (
                <p className='flex items-center h-10 font-medium text-red-400 text-xs'>
                  Cancelled
                </p>
              ) : appointment.isCompleted ? (
                <p className='flex items-center h-10 font-medium text-green-400 text-xs'>
                  Completed
                </p>
              ) : (
                <img
                  className='size-10 cursor-pointer'
                  src={assets.cancel_icon}
                  alt='cancel-icon'
                  onClick={() => handleCancelAppointment(appointment._id)}
                />
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
  );
};
