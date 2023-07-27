'use client';
import SearchForm from '@/components/common/SearchForm/SearchForm';
import { useState } from 'react';

export default function Search() {
  const [text, setText] = useState('');
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);
  const handleTextClear = () => setText('');

  return (
    <SearchForm
      text={text}
      onChange={handleTextChange}
      onTextClear={handleTextClear}
      hidden={true}
    />
  );
}
