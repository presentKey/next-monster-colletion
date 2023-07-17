'use client';
import { getSavedBookmarkInfo } from '@/service/bookmark';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import MonsterCardList from '../CategoryPage/MonsterCardList/MonsterCardList';
import Registration from '../CategoryPage/Registration/Registration';
import styles from './css/MemberBookmark.module.css';

export default function MemberBookmark() {
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
    <div className={styles.container}>
      {myBookmark?.bookmarks.map((bookmark) => (
        <article className={styles.article} key={bookmark.id}>
          <MonsterCardList monsters={[bookmark.monsters]} />
          {bookmark.information.map((info, index) => (
            <>
              {bookmark.information.length !== 1 && (
                <span className={styles.index}>{`${index + 1}.`}</span>
              )}
              <Registration key={index} registers={info.registers} />
            </>
          ))}
        </article>
      ))}
    </div>
  );
}
