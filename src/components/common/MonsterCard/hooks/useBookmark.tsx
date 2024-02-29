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
  const { isLoading, data: myBookmark } = useQuery(
    ['bookmark', session?.user.uid],
    () => getBookmarkList(),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!session,
    }
  );

  // 북마크 여부 반환
  const isBookmarked =
    myBookmark?.bookmarks.some((item) => item.id === monsterId) ?? false;

  // 북마크 mutation
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
        // 오류 발생 시, 이전 데이터로 복구
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

  /** 북마크 카드 쿼리의 optimistic update */
  function bookmarkOptimistic() {
    queryClient.setQueryData(
      ['bookmark', session?.user.uid],
      // @ts-expect-error
      (old: BookmarkList) => {
        // 북마크가 되어 있다면, 북마크 해제
        // 북마크가 되어 있지 않다면, 북마크 등록
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

  /** bookmark page 쿼리의 optimistic update */
  function savedBookmarkOptimistic() {
    queryClient.setQueryData(
      ['SavedBookmark', session?.user.uid],
      // @ts-expect-error
      (old: SavedBookmarkInfo) => {
        // 북마크가 되어 있다면, 북마크 해제
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
