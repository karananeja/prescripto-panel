import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { api } from '../../lib/api-client';
import { formatDate } from '../../lib/utils';

export const AllAppointments = () => {
  const { currencySymbol } = useAppContext();

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get('/admin/get-appointments');
        setAppointments(res.data.appointments);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
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

  return (
    <div className='m-5 w-full max-w-6xl'>
      <p className='mb-3 font-medium text-lg'>All Appointments</p>

      <div className='bg-white border border-border rounded min-h-[60vh] max-h-[80vh] overflow-y-auto text-sm'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col px-6 py-3 border-border border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>

        {appointments.map((appointment, index) => {
          const currentYear = new Date().getFullYear();
          const age = appointment.userData.dob
            ? `${
                currentYear - new Date(appointment.userData.dob).getFullYear()
              } years`
            : '-';

          return (
            <div
              key={appointment._id}
              className='flex flex-wrap justify-between items-center max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col hover:bg-gray-50 px-6 py-3 border-border border-b transition-all duration-300'
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
              <p className='max-sm:hidden'>{age}</p>
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
                <p className='flex items-center size-10 font-medium text-red-400 text-xs'>
                  Cancelled
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
          );
        })}
      </div>
    </div>
  );
};
