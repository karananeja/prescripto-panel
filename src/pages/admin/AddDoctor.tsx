import { useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';

import { assets } from '../../assets/assets';
import { api } from '../../lib/api-client';

import type { ChangeEvent } from 'react';

type State = {
  name: string;
  email: string;
  password: string;
  experience: string;
  fee: string;
  specialty: string;
  degree: string;
  address: { line1: string; line2: string };
  about: string;
  image: File | null;
};

type Action =
  | { type: 'SET_FIELD'; field: keyof State; value: string }
  | { type: 'SET_ADDRESS'; field: 'line1' | 'line2'; value: string }
  | { type: 'SET_IMAGE'; file: File | null }
  | { type: 'RESET' };

const initialState: State = {
  name: '',
  email: '',
  password: '',
  experience: '1 Year',
  fee: '',
  specialty: 'General physician',
  degree: '',
  address: { line1: '', line2: '' },
  about: '',
  image: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };

    case 'SET_ADDRESS':
      return {
        ...state,
        address: { ...state.address, [action.field]: action.value },
      };

    case 'SET_IMAGE':
      return { ...state, image: action.file };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export const AddDoctor = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.image) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(state.image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [state.image]);

  const handleChange =
    (field: keyof State) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      dispatch({ type: 'SET_FIELD', field, value: e.target.value });
    };

  const handleAddressChange =
    (field: 'line1' | 'line2') => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_ADDRESS', field, value: e.target.value });
    };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_IMAGE',
      file: event.target.files ? event.target.files[0] : null,
    });
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!state.image) {
        toast.error('Image not selected');
        return;
      }

      const formData = new FormData();

      formData.append('name', state.name);
      formData.append('email', state.email);
      formData.append('password', state.password);
      formData.append('experience', state.experience);
      formData.append('fee', state.fee);
      formData.append('specialty', state.specialty);
      formData.append('degree', state.degree);
      formData.append('about', state.about);
      formData.append('address', JSON.stringify(state.address));
      formData.append('image', state.image);

      const res = await api.post('/admin/add-doctor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(res.data.message);
      dispatch({ type: 'RESET' });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <form className='m-5 w-full' onSubmit={handleSubmit}>
      <p className='mb-3 font-medium text-lg'>Add Doctor</p>

      <div className='bg-white p-8 border border-border rounded w-full max-w-4xl max-h-[80vh] overflow-y-auto'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor='image-upload'>
            <img
              className='bg-gray-100 rounded-full w-16 cursor-pointer'
              src={preview || assets.upload_area}
              alt='upload-area'
            />
          </label>

          <input
            type='file'
            hidden
            id='image-upload'
            onChange={handleImageChange}
          />
          <p>
            Upload doctor <br /> image
          </p>
        </div>

        <div className='flex lg:flex-row flex-col items-start gap-10 text-gray-600'>
          <div className='flex flex-col lg:flex-1 gap-4 w-full'>
            <input
              placeholder='Doctor name'
              className='px-3 py-2 border rounded'
              value={state.name}
              onChange={handleChange('name')}
              required
            />

            <input
              type='email'
              placeholder='Doctor email'
              className='px-3 py-2 border rounded'
              value={state.email}
              onChange={handleChange('email')}
              required
            />

            <input
              type='password'
              placeholder='Doctor password'
              className='px-3 py-2 border rounded'
              value={state.password}
              onChange={handleChange('password')}
              required
            />

            <select
              className='px-3 py-2 border rounded'
              value={state.experience}
              onChange={handleChange('experience')}
              required
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>

            <input
              type='number'
              placeholder='Fee'
              className='px-3 py-2 border rounded'
              value={state.fee}
              onChange={handleChange('fee')}
              required
            />
          </div>

          <div className='flex flex-col lg:flex-1 gap-4 w-full'>
            <select
              className='px-3 py-2 border rounded'
              value={state.specialty}
              onChange={handleChange('specialty')}
              required
            >
              <option value='General physician'>General physician</option>
              <option value='Gynecologist'>Gynecologist</option>
              <option value='Dermatologist'>Dermatologist</option>
              <option value='Pediatrician'>Pediatrician</option>
              <option value='Neurologist'>Neurologist</option>
              <option value='Gastroenterologist'>Gastroenterologist</option>
            </select>

            <input
              placeholder='Education'
              className='px-3 py-2 border rounded'
              value={state.degree}
              onChange={handleChange('degree')}
              required
            />

            <input
              placeholder='Address line 1'
              className='px-3 py-2 border rounded'
              value={state.address.line1}
              onChange={handleAddressChange('line1')}
              required
            />

            <input
              placeholder='Address line 2'
              className='px-3 py-2 border rounded'
              value={state.address.line2}
              onChange={handleAddressChange('line2')}
              required
            />
          </div>
        </div>

        <div className='text-gray-600'>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea
            className='px-4 py-2 border rounded w-full'
            rows={5}
            value={state.about}
            onChange={handleChange('about')}
            required
          />
        </div>

        <button className='bg-primary mt-4 px-10 py-3 rounded-full text-white'>
          Add Doctor
        </button>
      </div>
    </form>
  );
};
