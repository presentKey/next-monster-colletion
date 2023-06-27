import { MonsterName } from '@/model/monster';
import Image from 'next/image';
import styles from './css/MonsterCard.module.css';
import BookMarkStarIcon from '../icons/BookMarkStarIcon';

type Props = {
  monster: MonsterName;
};

export default function MonsterCard({ monster }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles['image-wrap']}>
        <Image
          className={styles.image}
          src={`/images/monsters/${monster.name}.png`}
          alt={monster.name}
          fill
          sizes='(max-width: 96rem) 3.5rem'
        />
      </div>
      <span className={styles.bookmark}>
        <BookMarkStarIcon />
      </span>
      <span className={styles.name}>{monster.name}</span>
    </div>
  );
}
