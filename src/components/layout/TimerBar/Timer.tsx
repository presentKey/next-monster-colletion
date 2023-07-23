import { Timer } from '@/model/information';
import Image from 'next/image';
import styles from './css/Timer.module.css';
import TimerResetIcon from '@/components/common/icons/TimerResetIcon';
import RemoveIcon from '@/components/common/icons/RemoveIcon';
import { useState, useEffect, useRef } from 'react';

type Props = {
  timer: Timer;
};

export default function Timer({ timer }: Props) {
  const time = useRef(parseInt(timer.time, 10) * 60);
  const [clock, setClock] = useState({
    min: time.current / 60,
    sec: time.current % 60,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      time.current--;

      setClock({
        min: time.current / 60,
        sec: time.current % 60,
      });

      if (time.current < 0) {
        clearInterval(intervalId);
        setClock({ min: 0, sec: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <li className={`${styles.timer} ${time.current < 0 && styles['is-alarm']}`}>
      <div className={styles.info}>
        <div className={styles['image-wrap']}>
          <Image
            className={styles.image}
            src={`/images/monsters/${timer.monsterName}.png`}
            alt={`타이머 ${timer.monsterName} 이미지`}
            width={36}
            height={36}
          />
        </div>
        <span className={styles.time}>
          {`${Math.floor(clock.min).toString().padStart(2, '0')} : 
        ${clock.sec.toString().padStart(2, '0')}`}
        </span>
      </div>
      <div className={styles.buttons}>
        <button className={styles.reset} type='button'>
          <TimerResetIcon />
        </button>
        <button className={styles.close} type='button'>
          <RemoveIcon />
        </button>
      </div>
    </li>
  );
}
