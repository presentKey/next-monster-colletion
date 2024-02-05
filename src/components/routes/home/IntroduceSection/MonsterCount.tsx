'use client';
import { useEffect, useState } from 'react';
import styles from './css/MonsterCount.module.css';

type Props = {
  monsterNum: number;
};

export default function MonsterCount({ monsterNum }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let now = monsterNum;

    const counter = setInterval(() => {
      setCount(Math.ceil(monsterNum - now));

      if (now < 1) {
        clearInterval(counter);
      }

      const step = now / 10;

      now -= step;
    }, 50);
  }, [monsterNum]);

  return (
    <>
      <span className={styles.count}>{count}</span>
    </>
  );
}
