'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BookmarkService from '@/service/BookmarkSerivce';
import LocalStorage from '@/utils/LocalStorage';

type Props = {
  name: string;
};

const bookmarkService = new BookmarkService();

export default function Bookmark({ name }: Props) {
  const [saved, setSaved] = useState(false);
  const handleBookmarkClick = () => {
    bookmarkService
      .updateBookmark(name, saved) //
      .then(() => {
        toast.dismiss();
        saved
          ? (setSaved(false), toast.success('북마크가 해제되었습니다.'))
          : (setSaved(true), toast.success('북마크에 등록되었습니다.'));
      });
  };

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
      onClick={handleBookmarkClick}
    >
      <BookMarkStarIcon />
    </button>
  );
}
