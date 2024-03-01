'use client';
import { useDarkMode } from '@/context/DarkModeContext';
import { ToastContainer, ToastPosition, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useMemo, useState } from 'react';
import { throttle } from 'lodash';

export default function ToastNotification() {
  const { darkMode } = useDarkMode();
  const [position, setPosition] = useState<ToastPosition>('bottom-right');
  const getPosition = useMemo(
    () =>
      throttle(() => {
        window.matchMedia('(max-width: 48rem)').matches
          ? setPosition('top-right')
          : setPosition('bottom-right');
      }, 1000),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', getPosition);

    return () => window.removeEventListener('resize', getPosition);
  }, [getPosition]);

  return (
    <ToastContainer
      position={position}
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
