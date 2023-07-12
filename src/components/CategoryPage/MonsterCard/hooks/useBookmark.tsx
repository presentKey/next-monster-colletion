import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getBookmarkList, updateBookmark } from '@/service/bookmark';
import { Monster } from '@/model/monster';
import { BookmarkList } from '@/model/user';

export default function useBookmark(monsterId: string) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { isLoading, data: bookmark } = useQuery(
    ['bookmark', session?.user.uid],
    () => getBookmarkList(session?.user),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const isBookmarked =
    bookmark?.bookmarks.some((item) => item.id === monsterId) ?? false;

  const { mutate: bookmarkMutate } = useMutation(
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

        handleToastify(isBookmarked);
        return { previousBookmark };
      },
      onError: (context: { previousBookmark: BookmarkList }) =>
        queryClient.setQueryData(
          ['bookmark', session?.user.uid],
          context.previousBookmark
        ),
    }
  );

  const handleBookmarkClick = () => {
    if (!bookmark?.bookmarks) {
      toast.warn('잠시후 다시 시도해 주세요.');
      return;
    }

    bookmarkMutate();
  };

  return { isLoading, isBookmarked, handleBookmarkClick };
}

function handleToastify(isBookmarked: boolean) {
  toast.dismiss();
  isBookmarked
    ? toast.success('북마크가 해제되었습니다.')
    : toast.success('북마크에 등록되었습니다.');
}
