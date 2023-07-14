'use client';
import MonsterCardList from '@/components/CategoryPage/MonsterCardList/MonsterCardList';
import Registration from '@/components/CategoryPage/Registration/Registration';
import { getSavedBookmarkInfo } from '@/service/bookmark';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function BookmarkPage() {
  const { data: session } = useSession();
  const { isLoading, data: myBookmark } = useQuery(
    ['SavedBookmark', session?.user.uid],
    () => getSavedBookmarkInfo(session?.user),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  if (!session) return <></>;
  if (isLoading) return <p>로딩중</p>;

  return (
    <div>
      {myBookmark?.bookmarks.map((bookmark) => (
        <article key={bookmark.id}>
          <MonsterCardList monsters={[bookmark.monsters]} />
          {bookmark.information.map((info, index) => (
            <Registration key={index} registers={info.registers} />
          ))}
        </article>
      ))}
    </div>
  );
}
