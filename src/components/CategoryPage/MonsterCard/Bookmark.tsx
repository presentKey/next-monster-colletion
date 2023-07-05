'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';

type Props = {
  name: string;
};

export default function Bookmark({ name }: Props) {
  const updateBookmark = () => {
    if (!localStorage.getItem('bookmark')) {
      localStorage.setItem('bookmark', JSON.stringify([]));
    }

    const bookmark = JSON.parse(localStorage.getItem('bookmark') || '');

    localStorage.setItem(
      'bookmark',
      JSON.stringify([...new Set([...bookmark, name])])
    );
  };

  return (
    <button className={styles.bookmark} onClick={updateBookmark}>
      <BookMarkStarIcon />
    </button>
  );
}
