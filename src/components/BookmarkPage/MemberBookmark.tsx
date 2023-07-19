'use client';
import { getSavedBookmarkInfo } from '@/service/bookmark';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import MonsterCardList from '../common/MonsterCardList/MonsterCardList';
import Registration from '../common/Registration/Registration';
import styles from './css/MemberBookmark.module.css';
import ExplanationIndex from '../common/ExplanationIndex/ExplanationIndex';

export default function MemberBookmark() {
  const { data: session } = useSession();
  const { isLoading, data: myBookmark } = useQuery(
    ['SavedBookmark', session?.user.uid],
    () => getSavedBookmarkInfo(session?.user),
    {
      refetchOnWindowFocus: false,
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
            <div key={index}>
              <ExplanationIndex
                length={bookmark.information.length}
                index={index}
              />
              <Registration registers={info.registers} />
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}
