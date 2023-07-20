'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';
import { useEffect } from 'react';
import useBookmark from './hooks/useBookmark';

type Props = {
  monsterId: string;
};

export default function Bookmark({ monsterId }: Props) {
  const { isLoading, isBookmarked, handleBookmarkClick } =
    useBookmark(monsterId);

  return (
    <button
      className={`${styles.bookmark} ${
        isBookmarked && styles['is-bookmarked']
      } ${isLoading && styles['is-loading']}`}
      onClick={handleBookmarkClick}
      disabled={isLoading}
    >
      <BookMarkStarIcon />
    </button>
  );
}
