'use client';
import { Monster } from '@/model/monster';
import Image from 'next/image';
import styles from './css/MonsterCard.module.css';
import Bookmark from './Bookmark';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

type Props = {
  monster: Monster;
};

const TOP_HDEDER_MOBILE = 50 + 40;
const TOP_HEADER_DESKTOP = 50;

export default function MonsterCard({ monster }: Props) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sesarchParams = useSearchParams();
  const search = sesarchParams.get('search');

  useEffect(() => {
    if (cardRef.current?.innerText === search) {
      const position = cardRef.current.getBoundingClientRect().top;
      const scrollAmount =
        position -
        (window.innerWidth >= 768 ? TOP_HEADER_DESKTOP : TOP_HDEDER_MOBILE);

      window.scrollBy({
        top: scrollAmount,
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
          alt={monster.name}
          fill
          sizes='(max-width: 96rem) 3.5rem'
        />
      </div>
      <Bookmark monsterId={monster.id} />
      <span className={styles.name}>{monster.name}</span>
    </div>
  );
}
