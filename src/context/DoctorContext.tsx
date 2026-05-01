import { createContext, useContext } from 'react';

import type { ReactNode } from 'react';

type PropsType = { children: ReactNode };

type DoctorContextType = { currencySymbol: string };

const DoctorContext = createContext<DoctorContextType | null>(null);

export const DoctorContextProvider = ({ children }: PropsType) => {
  const currencySymbol = '₹';
  const value: DoctorContextType = { currencySymbol };
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
