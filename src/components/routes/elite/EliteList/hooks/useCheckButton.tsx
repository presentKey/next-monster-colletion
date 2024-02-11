import { useState, useEffect } from 'react';

export default function useCheckButton(
  key: string
): [boolean, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [check, setCheck] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, checked } = e.target;
    if (type === 'checkbox') {
      setCheck(checked);
      localStorage.setItem(key, JSON.stringify(checked));
    }
  };

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value === 'true' || value === 'false') {
      setCheck(JSON.parse(value));
    }
  }, [key]);

  return [check, handleChange];
}
