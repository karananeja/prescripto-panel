import { createContext, useContext, useState } from 'react';

import type { ReactNode } from 'react';

type PropsType = { children: ReactNode };

type DoctorContextType = {
  doctorToken: string;
  setDoctorToken: (token: string) => void;
};

const DoctorContext = createContext<DoctorContextType | null>(null);

export const DoctorContextProvider = ({ children }: PropsType) => {
  const [token, setToken] = useState(localStorage.getItem('doctorToken') || '');

  const setDoctorToken = (token: string) => {
    localStorage.setItem('doctorToken', token);
    setToken(token);
    if (!token) localStorage.removeItem('doctorToken');
  };

  const value: DoctorContextType = { doctorToken: token, setDoctorToken };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error(
      'useDoctorContext must be used within an <DoctorContextProvider />'
    );
  }
  return context;
};
