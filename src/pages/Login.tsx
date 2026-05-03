import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAdminContext } from '../context/AdminContext';
import { api } from '../lib/api-client';

import type { ChangeEvent } from 'react';

export const Login = () => {
  const { setAdminToken } = useAdminContext();

  const [isAdmin, setIsAdmin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isAdmin) {
        // login admin
        const res = await api.post('/admin/login', { email, password });
        setAdminToken(res.data.token);
        toast.success(res.data.message);
      } else {
        // login doctor
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <form className='flex items-center min-h-screen' onSubmit={handleSubmit}>
      <div className='flex flex-col items-start gap-3 shadow-lg m-auto p-8 border border-border rounded-xl min-w-80 sm:min-w-96 text-zinc-600 text-sm'>
        <p className='m-auto font-semibold text-2xl'>
          <span className='text-primary'>{isAdmin ? 'Admin' : 'Doctor'}</span>{' '}
          Login
        </p>

        <div className='w-full'>
          <p>Email</p>
          <input
            className='mt-1 p-2 border border-border rounded w-full'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            className='mt-1 p-2 border border-border rounded w-full'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className='bg-primary my-2 py-2 rounded-md w-full text-white text-base'>
          Login
        </button>

        {isAdmin ? (
          <p>
            Doctor Login?{' '}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setIsAdmin(!isAdmin)}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              className='text-primary underline cursor-pointer'
              onClick={() => setIsAdmin(!isAdmin)}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};
