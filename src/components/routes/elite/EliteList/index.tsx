'use client';
import { EliteCollections } from '@/model/monster';
import EliteCard from './EliteCard';
import styles from './css/index.module.css';
import { useSession } from 'next-auth/react';
import { getUserEliteCollections } from '@/service/request/eliteCollection';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { useCallback, useEffect, useState } from 'react';
import SettingBar from './SettingBar';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import useCheckButton from './hooks/useCheckButton';
import { ELITENAME, MODIFIER } from '@/components/InitialSetup/InitialSetup';

type Props = {
  defaultElite: EliteCollections[];
};

export default function EliteList({ defaultElite }: Props) {
  const { data: session } = useSession();
  const { save, handleDisableUnload, handleEnableUnload } = useBeforeUnload();
  const [modifierCheck, handleModifierCheck] = useCheckButton(MODIFIER);
  const [nameCheck, handleNameCheck] = useCheckButton(ELITENAME);
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

  /**
   * 두 카드의 위치 변경
   * @param dragIndex - 드래그 중인 카드의 index
   * @param hoverIndex - 바꿀 위치에 있는 카드의 index
   * */
  const cardMove = useCallback((dragIndex: number, hoverIndex: number) => {
    setEliteMonsters((prev) => {
      const newList = [...prev];
      [newList[dragIndex], newList[hoverIndex]] = [
        newList[hoverIndex],
        newList[dragIndex],
      ];

      return newList;
    });
  }, []);

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
            modifierCheck={modifierCheck}
            nameCheck={nameCheck}
            onAbleLoad={handleEnableUnload}
            onModifierCheckChange={handleModifierCheck}
            onNameCheckChange={handleNameCheck}
          />
          <ol className={styles.list}>
            {eliteMonsters.map((monster, index) => (
              <li className={styles.item} key={monster.elite.name}>
                <EliteCard
                  monster={monster.elite}
                  index={index}
                  modifierCheck={modifierCheck}
                  nameCheck={nameCheck}
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
