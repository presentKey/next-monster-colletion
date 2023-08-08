import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { getBookmarkList, updateBookmark } from '@/service/request/bookmark';
import { BookmarkList, SavedBookmarkInfo } from '@/model/user';
import { usePathname } from 'next/navigation';

export default function useBookmark(monsterId: string) {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { isLoading, data: bookmark } = useQuery(
    ['bookmark', session?.user.uid],
    () => getBookmarkList(),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!session,
    }
  );

  const isBookmarked =
    bookmark?.bookmarks.some((item) => item.id === monsterId) ?? false;

  const { mutate: bookmarkMutate } = useMutation(
    () => updateBookmark(monsterId, isBookmarked),
    {
      onMutate: async () => {
        const previousBookmark = queryClient.getQueryData([
          'bookmark',
          session?.user.uid,
        ]);

        bookmarkOptimistic();

        const previousSavedBookmark = queryClient.getQueryData([
          'bookmark',
          session?.user.uid,
        ]);

        if (pathname === '/bookmark') {
          savedBookmarkOptimistic();
        }

        handleToastify(isBookmarked);

        return { previousBookmark, previousSavedBookmark };
      },
      onError: (context: {
        previousBookmark: BookmarkList;
        previousSavedBookmark: SavedBookmarkInfo;
      }) => {
        queryClient.setQueryData(
          ['bookmark', session?.user.uid],
          context.previousBookmark
        );
        queryClient.setQueryData(
          ['SavedBookmark', session?.user.uid],
          context.previousSavedBookmark
        );
      },
    }
  );

  function bookmarkOptimistic() {
    queryClient.setQueryData(
      ['bookmark', session?.user.uid],
      // @ts-expect-error
      (old: BookmarkList) => {
        const newBookmark = isBookmarked
          ? {
              bookmarks: old.bookmarks.filter((item) => item.id !== monsterId),
            }
          : {
              bookmarks: [...old.bookmarks, { id: monsterId }],
            };

        return newBookmark;
      }
    );
  }

  function savedBookmarkOptimistic() {
    queryClient.setQueryData(
      ['SavedBookmark', session?.user.uid],
      // @ts-expect-error
      (old: SavedBookmarkInfo) => {
        const newSavedBookmark = isBookmarked && {
          bookmarks: old.bookmarks.filter((item) => item.id !== monsterId),
        };

        return newSavedBookmark;
      }
    );
  }

  const handleBookmarkClick = () => {
    if (!session) {
      toast.dismiss();
      toast.warn('구글 및 비회원 로그인을 해주세요.');
      return;
    }

    bookmarkMutate();
  };

  return { session, isLoading, isBookmarked, handleBookmarkClick };
}

function handleToastify(isBookmarked: boolean) {
  toast.dismiss();
  isBookmarked
    ? toast.success('북마크가 해제되었습니다.')
    : toast.success('북마크에 등록되었습니다.');
}
