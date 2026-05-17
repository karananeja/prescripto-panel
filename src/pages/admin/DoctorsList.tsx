import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../../lib/api-client';

const DoctorsListSkeleton = () => {
  return (
    <div className='m-5 max-h-[88vh] overflow-y-auto animate-pulse'>
      {/* Heading */}
      <div className='bg-gray-200 rounded w-32 h-7' />

      {/* Doctor Cards */}
      <div className='flex flex-wrap gap-x-4 gap-y-6 pt-5 w-full'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden'
          >
            {/* Image */}
            <div className='bg-gray-200 size-56' />

            {/* Content */}
            <div className='p-4'>
              {/* Name */}
              <div className='bg-gray-200 rounded w-36 h-5' />

              {/* Specialty */}
              <div className='bg-gray-100 mt-2 rounded w-24 h-4' />

              {/* Availability */}
              <div className='flex items-center gap-2 mt-4'>
                <div className='bg-gray-200 rounded w-4 h-4' />
                <div className='bg-gray-200 rounded w-20 h-4' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DoctorsList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isDoctorsLoading, setIsDoctorsLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsDoctorsLoading(true);
        const res = await api.get('/admin/get-all-doctors');
        setDoctors(res.data.doctors);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      } finally {
        setIsDoctorsLoading(false);
      }
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
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  return isDoctorsLoading ? (
    <DoctorsListSkeleton />
  ) : (
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
