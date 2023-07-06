'use client';
import { useDarkMode } from '@/context/DarkModeContext';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastNotification() {
  const { darkMode } = useDarkMode();

  return (
    <ToastContainer
      position='bottom-right'
      autoClose={2000}
      limit={0}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      transition={Zoom}
      draggable
      pauseOnHover
      theme={darkMode ? 'dark' : 'light'}
    />
  );
}
