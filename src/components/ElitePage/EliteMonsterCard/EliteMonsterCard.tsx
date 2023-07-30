import { EliteMonster } from '@/model/monster';
import styles from './css/EliteMonsterCard.module.css';
import Image from 'next/image';

type Props = {
  monster: EliteMonster;
};

export default function EliteMonsterCard({ monster }: Props) {
  return (
    <div className={`${styles.card}`}>
      <div className={styles['image-wrap']}>
        <Image
          className={styles.image}
          src={`/images/elite-monsters/${monster.name}.png`}
          alt={monster.name}
          fill
          sizes='(max-width: 96rem) 3.5rem'
        />
      </div>
      <div className={styles['name-container']}>
        <div className={styles['modifier']}>
          <span>{monster.modifier.first}</span>
          {monster.modifier.second && <span>{monster.modifier.second}</span>}
        </div>
        <span className={styles.name}>{monster.name}</span>
      </div>
    </div>
  );
}
