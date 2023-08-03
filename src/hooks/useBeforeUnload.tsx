import { useCallback, useEffect, useState } from 'react';

export default function useBeforeUnload() {
  const [save, setSave] = useState(true);
  const listener = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);

  const handleDisableUnload = () => {
    window.addEventListener('beforeunload', listener);
    setSave(false);
  };

  const handleEnableUnload = () => {
    window.removeEventListener('beforeunload', listener);
    setSave(true);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [listener]);

  return { save, handleDisableUnload, handleEnableUnload };
}
