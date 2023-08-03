import { useState } from 'react';

export default function useCheckButton(): [
  boolean,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] {
  const [check, setCheck] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, checked } = e.target;
    if (type === 'checkbox') {
      setCheck((prev) => (prev = checked));
    }
  };
  return [check, handleChange];
}
