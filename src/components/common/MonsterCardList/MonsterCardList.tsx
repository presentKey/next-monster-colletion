import { Monster } from '@/model/monster';
import styles from './css/MonsterCardList.module.css';
import MonsterCard from '../MonsterCard';
import { Suspense } from 'react';

type Props = {
  monsters: Monster[];
};

export default function MonsterCardList({ monsters }: Props) {
  return (
    <ol className={styles.item}>
      {monsters.map((monster, index) => (
        <li className={styles.list} key={index}>
          <Suspense fallback={<></>}>
            <MonsterCard monster={monster as Monster} />
          </Suspense>
        </li>
      ))}
    </ol>
  );
}
