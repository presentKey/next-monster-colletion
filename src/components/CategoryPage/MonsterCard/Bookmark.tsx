'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getBookmarkList, updateBookmark } from '@/service/bookmark';

type Props = {
  monsterId: string;
};

export default function Bookmark({ monsterId }: Props) {
  const [saved, setSaved] = useState(false);
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { data: { bookmarks } = { bookmarks: [] } } = useQuery(
    ['bookmark', session?.user.uid],
    () => getBookmarkList(session?.user),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const updateMutation = useMutation(
    () => updateBookmark(monsterId, bookmarks, session?.user, saved),
    {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ['bookmark', session?.user.uid],
        }),
    }
  );

  const handleBookmarkClick = () => {
    updateMutation.mutate(undefined, {
      onSuccess: () => {
        toast.dismiss();
        saved
          ? (setSaved(false), toast.success('북마크가 해제되었습니다.'))
          : (setSaved(true), toast.success('북마크에 등록되었습니다.'));
      },
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('bookmark')) {
      localStorage.setItem('bookmark', JSON.stringify({ bookmarks: [] }));
    }

    if (bookmarks !== undefined) {
      setSaved(bookmarks.some((item) => item.id === monsterId));
    }
  }, [bookmarks, monsterId]);

  return (
    <button
      className={`${styles.bookmark} ${saved && styles['is-saved']}`}
      onClick={handleBookmarkClick}
    >
      <BookMarkStarIcon />
    </button>
  );
}
