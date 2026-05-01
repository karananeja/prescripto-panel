import { useState } from 'react';

import type { ChangeEvent } from 'react';

export const Login = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ email, password });
  };

  return (
    <form className='flex items-center min-h-[80vh]' onSubmit={handleSubmit}>
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
