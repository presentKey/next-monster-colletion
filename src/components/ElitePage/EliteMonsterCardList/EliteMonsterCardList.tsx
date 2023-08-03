'use client';
import { EliteCollections } from '@/model/monster';
import EliteMonsterCard from '../EliteMonsterCard/EliteMonsterCard';
import styles from './css/EliteMonsterCardList.module.css';
import { useSession } from 'next-auth/react';
import { getUserEliteCollections } from '@/service/request/eliteCollection';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { useCallback, useEffect, useState } from 'react';
import SettingBar from '../SettingBar/SettingBar';
import useBeforeUnload from '@/hooks/useBeforeUnload';

type Props = {
  defaultElite: EliteCollections[];
};

export default function EliteMonsterCardList({ defaultElite }: Props) {
  const { data: session } = useSession();
  const { save, handleDisableUnload, handleEnableUnload } = useBeforeUnload();
  const { isLoading, data: myElite } = useQuery(
    ['myCollection', session?.user.uid],
    () => getUserEliteCollections(session?.user, defaultElite),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  const [eliteMonsters, setEliteMonsters] = useState<EliteCollections[] | []>(
    []
  );

  const cardMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newCardList = [...eliteMonsters];
      const [draggedCard] = newCardList.splice(dragIndex, 1);
      newCardList.splice(hoverIndex, 0, draggedCard);

      setEliteMonsters(newCardList);
    },
    [eliteMonsters]
  );

  const handleRegisterClick = (monsterName: string) => {
    setEliteMonsters((prev) =>
      prev.map((monster) => {
        if (monster.elite.name === monsterName) {
          return {
            elite: {
              ...monster.elite,
              isRegistred: !monster.elite.isRegistred,
            },
          };
        }

        return monster;
      })
    );
  };

  useEffect(
    () => setEliteMonsters(myElite ?? defaultElite),
    [myElite, defaultElite]
  );

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      {eliteMonsters && (
        <>
          <SettingBar
            eliteList={eliteMonsters}
            save={save}
            onAbleLoad={handleEnableUnload}
          />
          <ol className={styles.list}>
            {eliteMonsters.map((monster, index) => (
              <li className={styles.item} key={monster.elite.name}>
                <EliteMonsterCard
                  monster={monster.elite}
                  index={index}
                  cardMove={cardMove}
                  onDisableUnload={handleDisableUnload}
                  onRegisterClick={handleRegisterClick}
                />
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
