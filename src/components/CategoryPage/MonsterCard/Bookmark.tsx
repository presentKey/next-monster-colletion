'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import BookmarkService from '@/service/BookmarkSerivce';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

type Props = {
  name: string;
};

const bookmarkService = new BookmarkService();

export default function Bookmark({ name }: Props) {
  const [saved, setSaved] = useState(false);
  const { data: session } = useSession();
  const { data: bookmark } = useQuery(
    ['bookmark', session?.user.uid],
    () => bookmarkService.getBookmarkList(session?.user),
    {
      staleTime: 1000 * 60 * 60,
      placeholderData: [],
    }
  );

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

    if (bookmark !== undefined) {
      setSaved(bookmark.some((monsterName) => monsterName === name));
    }
  }, [bookmark, name]);

  return (
    <button
      className={`${styles.bookmark} ${saved && styles['is-saved']}`}
      onClick={handleBookmarkClick}
    >
      <BookMarkStarIcon />
    </button>
  );
}
