import { createContext, useContext } from 'react';

import type { ReactNode } from 'react';

type PropsType = { children: ReactNode };

type AppContextType = { currencySymbol: string };

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: PropsType) => {
  const currencySymbol = '₹';
  const value: AppContextType = { currencySymbol };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useAppContext must be used within an <AppContextProvider />'
    );
  }
  return context;
};
