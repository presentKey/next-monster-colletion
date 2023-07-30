import { EliteMonster, Monster } from '@/model/monster';
import styles from './css/MonsterCardList.module.css';
import MonsterCard from '../MonsterCard/MonsterCard';
import { Suspense } from 'react';
import EliteMonsterCard from '@/components/ElitePage/EliteMonsterCard/EliteMonsterCard';

type Props = {
  monsters: Monster[] | EliteMonster[];
  type?: 'general' | 'elite';
};

export default function MonsterCardList({ monsters, type = 'general' }: Props) {
  return (
    <ol className={styles.item}>
      {monsters.map((monster, index) => (
        <li className={styles.list} key={index}>
          {type === 'general' ? (
            <Suspense fallback={<></>}>
              <MonsterCard monster={monster as Monster} />
            </Suspense>
          ) : (
            <EliteMonsterCard monster={monster as EliteMonster} />
          )}
        </li>
      ))}
    </ol>
  );
}
