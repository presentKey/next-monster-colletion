'use client';
import { Monster } from '@/model/monster';
import Image from 'next/image';
import styles from './css/index.module.css';
import Bookmark from './Bookmark';
import { useSearchParams } from 'next/navigation';
import imageEncodeURI from '@/utils/imageEncodeURI';

type Props = {
  monster: Monster;
};

export default function MonsterCard({ monster }: Props) {
  const sesarchParams = useSearchParams();
  const search = sesarchParams.get('search');
  const encodeName = imageEncodeURI(monster.name);

  return (
    <div
      className={`${styles.card} ${search === monster.name && styles.target}`}
      data-tooltip-id='monster-tooltip' // <MonsterToolTip /> 컴포넌트와 연결
      data-tooltip-content={monster.name}
      data-monster-name={monster.name}
    >
      <div className={styles['image-wrap']}>
        <Image
          className={styles.image}
          src={`/images/monsters/${encodeName}.png`}
          alt={`${monster.name} 몬컬 이미지`}
          fill
          sizes='70px'
        />
      </div>
      <Bookmark monsterId={monster.id} />
      <span className={styles.name}>{monster.name}</span>
      <h6 className='visually-hidden'>{`${monster.name} 몬컬`}</h6>
    </div>
  );
}
