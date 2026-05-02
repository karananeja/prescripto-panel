import { createContext, useContext, useState } from 'react';

import type { ReactNode } from 'react';

type PropsType = { children: ReactNode };

type AdminContextType = {
  adminToken: string;
  setAdminToken: (token: string) => void;
};

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminContextProvider = ({ children }: PropsType) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');

  const setAdminToken = (token: string) => {
    localStorage.setItem('adminToken', token);
    setToken(token);
    if (!token) localStorage.removeItem('adminToken');
  };

  const value: AdminContextType = { adminToken: token, setAdminToken };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      'useAdminContext must be used within an <AdminContextProvider />'
    );
  }
  return context;
};
