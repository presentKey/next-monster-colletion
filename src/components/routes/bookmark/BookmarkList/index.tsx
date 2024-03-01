'use client';
import { getSavedBookmarkInfo } from '@/service/request/bookmark';
import { useQuery } from '@tanstack/react-query';
import MonsterCardList from '../../../common/MonsterCardList/MonsterCardList';
import RegistrationAct from '../../../common/RegistrationAct';
import styles from './css/index.module.css';
import ExplanationIndex from '../../../common/ExplanationIndex';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner';
import EmptyList from './EmptyList';
import { Fragment } from 'react';
import YoutubeButton from '@/components/common/YoutubeButton';

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

          {bookmark.monsters.youtube && (
            <YoutubeButton youtube={bookmark.monsters.youtube} />
          )}

          {bookmark.information.map((info, index) => (
            <Fragment key={index}>
              <ExplanationIndex
                length={bookmark.information.length}
                index={index}
              />
              <RegistrationAct
                registers={info.registers}
                monsterName={bookmark.monsters.name}
              />
            </Fragment>
          ))}
        </article>
      ))}
    </div>
  );
}
