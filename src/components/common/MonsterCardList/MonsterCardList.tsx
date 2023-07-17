import { Monster } from '@/model/monster';
import styles from './css/MonsterCardList.module.css';
import MonsterCard from '../MonsterCard/MonsterCard';

type Props = {
  monsters: Monster[];
};

export default function MonsterCardList({ monsters }: Props) {
  return (
    <ol className={styles.item}>
      {monsters.map((monster, index) => (
        <li className={styles.list} key={index}>
          <MonsterCard monster={monster} />
        </li>
      ))}
    </ol>
  );
}
