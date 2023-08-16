'use client';
import { Monster } from '@/model/monster';
import Image from 'next/image';
import styles from './css/MonsterCard.module.css';
import Bookmark from './Bookmark';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import calcScrollAmount from '@/utils/calcScrollAmount';

type Props = {
  monster: Monster;
};

export default function MonsterCard({ monster }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sesarchParams = useSearchParams();
  const search = sesarchParams.get('search');

  useEffect(() => {
    if (cardRef.current?.innerText === search) {
      const position = cardRef.current.getBoundingClientRect().top;

      window.scrollBy({
        top: calcScrollAmount(position),
      });
    }
  }, [search]);

  return (
    <div
      className={`${styles.card} ${search === monster.name && styles.target}`}
      ref={cardRef}
    >
      <div className={styles['image-wrap']}>
        <Image
          className={styles.image}
          src={`/images/monsters/${monster.name}.png`}
          alt={`${monster.name} 몬컬 이미지`}
          fill
          sizes='70px'
        />
      </div>
      <Bookmark monsterId={monster.id} />
      <span className={styles.name}>{monster.name}</span>
    </div>
  );
}
