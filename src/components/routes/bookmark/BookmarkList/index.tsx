'use client';
import { getSavedBookmarkInfo } from '@/service/request/bookmark';
import { useQuery } from '@tanstack/react-query';
import MonsterCardList from '../../../common/MonsterCardList/MonsterCardList';
import Registration from '../../../common/Registration/Registration';
import styles from './css/index.module.css';
import ExplanationIndex from '../../../common/ExplanationIndex/ExplanationIndex';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner';
import EmptyList from './EmptyList';

export default function BookmarkList() {
  const { data: session } = useSession();
  const { isLoading, data: myBookmark } = useQuery(
    ['SavedBookmark', session?.user.uid],
    () => getSavedBookmarkInfo(),
    {
      refetchOnWindowFocus: false,
      enabled: !!session,
    }
  );

  if (session && isLoading) return <LoadingSpinner />;
  return (
    <div className={styles.container}>
      {(!session || myBookmark?.bookmarks.length === 0) && <EmptyList />}

      {myBookmark?.bookmarks.map((bookmark) => (
        <article className={styles.article} key={bookmark.id}>
          <MonsterCardList monsters={[bookmark.monsters]} />
          {bookmark.information.map((info, index) => (
            <div key={index}>
              <ExplanationIndex
                length={bookmark.information.length}
                index={index}
              />
              <Registration
                registers={info.registers}
                monsterName={bookmark.monsters.name}
                youtube={bookmark.monsters.youtube}
              />
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}