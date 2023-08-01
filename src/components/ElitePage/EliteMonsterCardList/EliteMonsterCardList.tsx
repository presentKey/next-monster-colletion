'use client';
import { DefaultEliteCollections } from '@/model/monster';
import EliteMonsterCard from '../EliteMonsterCard/EliteMonsterCard';
import styles from './css/EliteMonsterCardList.module.css';
import { useSession } from 'next-auth/react';
import { getUserEliteCollections } from '@/service/request/eliteCollection';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { useCallback, useState } from 'react';

type Props = {
  defaultElite: DefaultEliteCollections[];
};

export default function EliteMonsterCardList({ defaultElite }: Props) {
  const { data: session } = useSession();
  const { isLoading, data: myElite } = useQuery(
    ['myCollection', session?.user.uid],
    () => getUserEliteCollections(session?.user),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  const [eliteMonsters, setEliteMonsters] = useState(
    myElite?.eliteCollections ?? defaultElite
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

  if (isLoading) return <LoadingSpinner />;
  return (
    <ol className={styles.list}>
      {eliteMonsters.map((monster, index) => (
        <li className={styles.item} key={monster.elite.name}>
          <EliteMonsterCard
            monster={monster.elite}
            index={index}
            cardMove={cardMove}
          />
        </li>
      ))}
    </ol>
  );
}
