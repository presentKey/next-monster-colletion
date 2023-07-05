'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';
import { useEffect, useState } from 'react';

type Props = {
  name: string;
};

export default function Bookmark({ name }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const bookmark = JSON.parse(
      localStorage.getItem('bookmark') || ''
    ) as string[];

    setSaved(bookmark.some((monsterName) => monsterName === name));
  }, [name]);

  const updateBookmark = () => {
    if (!localStorage.getItem('bookmark')) {
      localStorage.setItem('bookmark', JSON.stringify([]));
    }

    const bookmark = JSON.parse(localStorage.getItem('bookmark') || '');

    localStorage.setItem(
      'bookmark',
      JSON.stringify([...new Set([...bookmark, name])])
    );

    setSaved(true);
  };

  return (
    <button
      className={`${styles.bookmark} ${saved && styles['is-saved']}`}
      onClick={updateBookmark}
    >
      <BookMarkStarIcon />
    </button>
  );
}
