import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../../lib/api-client';

export const DoctorsList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await api.get('/admin/get-all-doctors');
      setDoctors(res.data.doctors);
    };

    fetchDoctors();
  }, []);

  const handleChangeAvailability = async (doctorId: string) => {
    try {
      const res = await api.post('/admin/change-availability', { doctorId });
      toast.success(res.data.message);
      setDoctors((prev) =>
        prev.map((doctor) =>
          doctor._id === doctorId
            ? { ...doctor, available: !doctor.available }
            : doctor
        )
      );
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className='m-5 max-h-[88vh] overflow-y-auto'>
      <h1 className='font-medium text-lg'>All Doctors</h1>
      <div className='flex flex-wrap gap-x-4 gap-y-6 pt-5 w-full'>
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className='group border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer'
          >
            <img
              className='bg-indigo-50 group-hover:bg-primary transition-all duration-500'
              src={doctor.image}
              alt={doctor.name}
            />
            <div className='p-4'>
              <p className='font-medium text-neutral-800 text-lg'>
                {doctor.name}
              </p>
              <p className='text-zinc-600 text-sm'>{doctor.specialty}</p>
              <div className='flex items-center gap-1 mt-2 text-sm'>
                <input
                  id={`available-${doctor._id}`}
                  type='checkbox'
                  className='cursor-pointer'
                  checked={doctor.available}
                  onChange={() => handleChangeAvailability(doctor._id)}
                />
                <label
                  htmlFor={`available-${doctor._id}`}
                  className='cursor-pointer'
                >
                  Available
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
