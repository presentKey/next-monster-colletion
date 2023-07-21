'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';
import useBookmark from './hooks/useBookmark';

type Props = {
  monsterId: string;
};

export default function Bookmark({ monsterId }: Props) {
  const { session, isLoading, isBookmarked, handleBookmarkClick } =
    useBookmark(monsterId);

  return (
    <button
      className={`${styles.bookmark} ${
        isBookmarked && styles['is-bookmarked']
      } ${session?.user && isLoading && styles['is-loading']}`}
      onClick={handleBookmarkClick}
      disabled={session?.user && isLoading}
    >
      <BookMarkStarIcon />
    </button>
  );
}
