'use client';
import { DefaultEliteCollections } from '@/model/monster';
import EliteMonsterCard from '../EliteMonsterCard/EliteMonsterCard';
import styles from './css/EliteMonsterCardList.module.css';
import { useSession } from 'next-auth/react';
import { getUserEliteCollections } from '@/service/request/eliteCollection';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import { useRef, useState } from 'react';

type Props = {
  defaultElite: DefaultEliteCollections[];
};

type Dragged = {
  name: string;
  index: number;
};

export default function EliteMonsterCardList({ defaultElite }: Props) {
  const dragged = useRef<Dragged | null>(null);
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

  const handleDrag = (e: React.DragEvent<HTMLLIElement>) => {
    const parentNode = e.currentTarget.parentNode as HTMLOListElement;
    dragged.current = {
      name: e.currentTarget.dataset.name || '',
      index: [...parentNode.children].indexOf(e.currentTarget),
    };
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDragDrop = (e: React.DragEvent<HTMLLIElement>) => {
    if (!dragged.current) return;

    const target = e.currentTarget;
    const parentNode = target.parentNode as HTMLOListElement;

    if (target.dataset.name !== dragged.current.name) {
      const droppedIndex = [...parentNode.children].indexOf(target);

      setEliteMonsters((prev) => {
        [prev[droppedIndex], prev[dragged.current?.index as number]] = [
          prev[dragged.current?.index as number],
          prev[droppedIndex],
        ];

        return prev;
      });
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <ol className={styles.list}>
      {eliteMonsters.map((monster) => (
        <li
          className={styles.item}
          key={monster.elite.name}
          data-id={monster.elite.id}
          data-name={monster.elite.name}
          draggable={true}
          onDrag={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDragDrop}
        >
          <EliteMonsterCard monster={monster.elite} />
        </li>
      ))}
    </ol>
  );
}
