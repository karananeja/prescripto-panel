import './index.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { AppContextProvider } from './context/AppContext';
import { AdminContextProvider } from './context/AdminContext';
import { DoctorContextProvider } from './context/DoctorContext';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
