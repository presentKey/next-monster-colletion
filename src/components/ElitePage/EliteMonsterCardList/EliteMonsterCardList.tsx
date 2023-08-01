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

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = eliteMonsters[dragIndex];
      let newCardList = [...eliteMonsters];
      newCardList.splice(dragIndex, 1);
      newCardList.splice(hoverIndex, 0, dragCard);

      setEliteMonsters(newCardList);
    },
    [eliteMonsters]
  );

  if (isLoading) return <LoadingSpinner />;
  return (
    <ol className={styles.list}>
      {eliteMonsters.map((monster, index) => (
        <EliteMonsterCard
          key={monster.elite.name}
          monster={monster.elite}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </ol>
  );
}

{
  /* <li
className={styles.item}
key={monster.elite.name}
// data-id={monster.elite.id}
// data-name={monster.elite.name}
// draggable={true}
// onDrag={handleDrag}
// onDragOver={handleDragOver}
// onDrop={handleDragDrop}
>
<EliteMonsterCard
key={monster.elite.name}
  monster={monster.elite}
  name={monster.elite.name}
  index={index}
  findCard={findCard}
  moveCard={moveCard}
/>
</li> */
}
