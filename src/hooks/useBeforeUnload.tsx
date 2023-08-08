import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export default function useBeforeUnload() {
  const [save, setSave] = useState(true);
  const { data: session } = useSession();
  const listener = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);

  const handleDisableUnload = () => {
    if (session) {
      window.addEventListener('beforeunload', listener);
      setSave(false);
    }
  };

  const handleEnableUnload = () => {
    if (session) {
      window.removeEventListener('beforeunload', listener);
      setSave(true);
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('beforeunload', listener);
    };
  }, [listener]);

  return { save, handleDisableUnload, handleEnableUnload };
}
