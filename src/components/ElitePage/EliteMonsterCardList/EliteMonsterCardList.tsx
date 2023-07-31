'use client';
import { DefaultEliteCollections } from '@/model/monster';
import EliteMonsterCard from '../EliteMonsterCard/EliteMonsterCard';
import styles from './css/EliteMonsterCardList.module.css';
import { useSession } from 'next-auth/react';
import { getUserEliteCollections } from '@/service/request/eliteCollection';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

type Props = {
  defaultElite: DefaultEliteCollections[];
};

export default function EliteMonsterCardList({ defaultElite }: Props) {
  const { data: session } = useSession();
  const { isLoading, data: myElite } = useQuery(
    ['myCollection', session?.user.uid],
    () => getUserEliteCollections(),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!session,
    }
  );
  const eliteMonsters = myElite?.eliteCollections ?? defaultElite;

  if (isLoading) return <LoadingSpinner />;
  return (
    <ol className={styles.item}>
      {eliteMonsters.map((monster) => (
        <li className={styles.list} key={monster.elite.name}>
          <EliteMonsterCard monster={monster.elite} />
        </li>
      ))}
    </ol>
  );
}
