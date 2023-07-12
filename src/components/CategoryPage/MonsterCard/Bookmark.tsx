'use client';
import BookMarkStarIcon from '@/components/common/icons/BookMarkStarIcon';
import styles from './css/Bookmark.module.css';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getBookmarkList, updateBookmark } from '@/service/bookmark';
import { Monster } from '@/model/monster';
import { BookmarkList } from '@/model/user';

type Props = {
  monsterId: string;
};

export default function Bookmark({ monsterId }: Props) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { isLoading, data: bookmark } = useQuery(
    ['bookmark', session?.user.uid],
    () => getBookmarkList(session?.user),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const updateMutation = useMutation(
    () =>
      updateBookmark(
        monsterId,
        bookmark?.bookmarks as Monster[],
        session?.user,
        isBookmarked
      ),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({
          queryKey: ['bookmark', session?.user.uid],
        });

        const previousBookmark = queryClient.getQueryData([
          'bookmark',
          session?.user.uid,
        ]);

        queryClient.setQueryData(
          ['bookmark', session?.user.uid],
          // @ts-expect-error
          (old: BookmarkList) => {
            const newBookmark = isBookmarked
              ? {
                  bookmarks: old.bookmarks.filter(
                    (item) => item.id !== monsterId
                  ),
                }
              : {
                  bookmarks: [...old.bookmarks, { id: monsterId }],
                };

            return newBookmark;
          }
        );

        toast.dismiss();
        isBookmarked
          ? toast.success('북마크가 해제되었습니다.')
          : toast.success('북마크에 등록되었습니다.');

        return { previousBookmark };
      },
      onError: (context: { previousBookmark: BookmarkList }) => {
        queryClient.setQueryData(
          ['bookmark', session?.user.uid],
          context.previousBookmark
        );
      },
    }
  );

  const isBookmarked =
    bookmark?.bookmarks.some((item) => item.id === monsterId) ?? false;

  const handleBookmarkClick = () => {
    if (!bookmark?.bookmarks) {
      toast.warn('잠시후 다시 시도해 주세요.');
      return;
    }

    updateMutation.mutate();
  };

  useEffect(() => {
    if (!localStorage.getItem('bookmark')) {
      localStorage.setItem('bookmark', JSON.stringify({ bookmarks: [] }));
    }
  }, []);

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
