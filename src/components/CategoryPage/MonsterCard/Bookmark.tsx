'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';
import { useEffect, useState } from 'react';
import BookmarkService from '@/service/BookmarkSerivce';

type Props = {
  name: string;
};

const bookmarkService = new BookmarkService();

export default function Bookmark({ name }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('bookmark')) {
      localStorage.setItem('bookmark', JSON.stringify([]));
    }

    const bookmark = JSON.parse(
      localStorage.getItem('bookmark') as string
    ) as string[];

    setSaved(bookmark.some((monsterName) => monsterName === name));
  }, [name]);

  return (
    <button
      className={`${styles.bookmark} ${saved && styles['is-saved']}`}
      onClick={() => bookmarkService.updateBookmark(name, saved, setSaved)}
    >
      <BookMarkStarIcon />
    </button>
  );
}
