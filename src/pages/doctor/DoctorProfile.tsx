import { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppContext } from '../../context/AppContext';
import { api } from '../../lib/api-client';

import type { ChangeEvent } from 'react';

type State = {
  doctorDetails: DoctorProfile;
  isEdit: boolean;
};

type Action =
  | { type: 'SET_DOCTOR_DETAILS'; payload: DoctorProfile }
  | { type: 'UPDATE_FIELD'; field: keyof DoctorProfile; payload: unknown }
  | {
      type: 'UPDATE_ADDRESS';
      field: keyof DoctorProfile['address'];
      payload: string;
    }
  | { type: 'TOGGLE_EDIT'; payload?: boolean };

const initialState: State = {
  doctorDetails: {
    name: '',
    email: '',
    image: '',
    specialty: '',
    degree: '',
    experience: '',
    about: '',
    available: false,
    fee: 0,
    address: {
      line1: '',
      line2: '',
    },
  },
  isEdit: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DOCTOR_DETAILS':
      return {
        ...state,
        doctorDetails: action.payload,
      };

    case 'UPDATE_FIELD':
      return {
        ...state,
        doctorDetails: {
          ...state.doctorDetails,
          [action.field]: action.payload,
        },
      };

    case 'UPDATE_ADDRESS':
      return {
        ...state,
        doctorDetails: {
          ...state.doctorDetails,
          address: {
            ...state.doctorDetails.address,
            [action.field]: action.payload,
          },
        },
      };

    case 'TOGGLE_EDIT':
      return {
        ...state,
        isEdit:
          typeof action.payload === 'boolean' ? action.payload : !state.isEdit,
      };

    default:
      return state;
  }
};

const inputClass =
  'h-9 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-primary';

const textClass =
  'h-9 flex items-center px-3 text-sm text-gray-700 border border-transparent';

export const DoctorProfile = () => {
  const { currencySymbol } = useAppContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const [originalDoctor, setOriginalDoctor] = useState<DoctorProfile | null>(
    null
  );

  const { doctorDetails, isEdit } = state;

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await api.get('/doctor/get-doctor-info');
        dispatch({ type: 'SET_DOCTOR_DETAILS', payload: res.data.doctor });
        setOriginalDoctor(res.data.doctor);
      } catch (error) {
        toast.error((error as Error).message);
        console.error(error);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleSave = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      fee: doctorDetails.fee,
      address: doctorDetails.address,
      available: doctorDetails.available,
    };

    try {
      await api.put('/doctor/update-doctor-info', payload);
      toast.success('Profile updated successfully');
      setOriginalDoctor(doctorDetails);
      dispatch({ type: 'TOGGLE_EDIT', payload: false });
    } catch (error) {
      toast.error((error as Error).message);
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (originalDoctor)
      dispatch({ type: 'SET_DOCTOR_DETAILS', payload: originalDoctor });
    dispatch({ type: 'TOGGLE_EDIT', payload: false });
  };

  return (
    <form onSubmit={handleSave} className='flex flex-col gap-4 m-5'>
      {doctorDetails.image && (
        <img
          className='bg-primary/80 rounded-lg w-full sm:max-w-64'
          src={doctorDetails.image}
          alt={doctorDetails.name}
        />
      )}

      <div className='flex-1 bg-white px-8 py-7 border border-stone-100 rounded-lg'>
        <p className='font-medium text-gray-700 text-3xl'>
          {doctorDetails.name}
        </p>

        <div className='flex items-center gap-2 mt-1 text-gray-600'>
          <p>
            {doctorDetails.degree} - {doctorDetails.specialty}
          </p>

          <button
            type='button'
            className='px-2 py-0.5 border border-border rounded-full text-xs'
          >
            {doctorDetails.experience}
          </button>
        </div>

        <div>
          <p className='mt-3 font-medium text-neutral-800 text-sm'>About</p>

          <p className='mt-1 max-w-[700px] text-gray-600 text-sm leading-6'>
            {doctorDetails.about}
          </p>
        </div>

        <div className='flex items-center gap-2 mt-4'>
          <p className='font-medium text-gray-600'>Appointment Fee</p>

          <span className='flex items-center text-gray-800'>
            {currencySymbol}

            {isEdit ? (
              <input
                type='number'
                value={doctorDetails.fee}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_FIELD',
                    field: 'fee',
                    payload: Number(e.target.value),
                  })
                }
                className={`${inputClass} w-24 ml-1`}
              />
            ) : (
              <span className={`${textClass} ml-1 min-w-24`}>
                {doctorDetails.fee}
              </span>
            )}
          </span>
        </div>

        <div className='flex gap-2 py-3'>
          <p className='mt-1 font-medium text-gray-600'>Address</p>

          <div className='flex flex-col gap-2 w-full max-w-md'>
            {isEdit ? (
              <input
                type='text'
                value={doctorDetails.address.line1}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_ADDRESS',
                    field: 'line1',
                    payload: e.target.value,
                  })
                }
                className={inputClass}
              />
            ) : (
              <span className={textClass}>{doctorDetails.address.line1}</span>
            )}

            {isEdit ? (
              <input
                type='text'
                value={doctorDetails.address.line2}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_ADDRESS',
                    field: 'line2',
                    payload: e.target.value,
                  })
                }
                className={inputClass}
              />
            ) : (
              <span className={textClass}>{doctorDetails.address.line2}</span>
            )}
          </div>
        </div>

        <div className='flex items-center gap-2 pt-2'>
          <input
            type='checkbox'
            id='available'
            disabled={!isEdit}
            checked={doctorDetails.available}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                field: 'available',
                payload: e.target.checked,
              })
            }
            className='w-4 h-4'
          />

          <label htmlFor='available' className='text-gray-700 text-sm'>
            Available
          </label>
        </div>

        <div className='mt-6'>
          {isEdit ? (
            <div className='flex gap-3'>
              <button
                type='button'
                onClick={handleCancel}
                className='hover:bg-red-600 px-5 py-2 border rounded-full hover:text-white text-sm transition-all duration-300'
              >
                Cancel
              </button>

              <button
                type='submit'
                className='hover:bg-primary px-5 py-2 border border-primary rounded-full hover:text-white text-sm transition-all duration-300'
              >
                Save Information
              </button>
            </div>
          ) : (
            <button
              type='button'
              onClick={() =>
                dispatch({
                  type: 'TOGGLE_EDIT',
                  payload: true,
                })
              }
              className='hover:bg-primary px-5 py-2 border border-primary rounded-full hover:text-white text-sm transition-all duration-300'
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
