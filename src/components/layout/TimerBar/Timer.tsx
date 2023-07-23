import { Timer } from '@/model/information';
import Image from 'next/image';
import styles from './css/Timer.module.css';
import TimerResetIcon from '@/components/common/icons/TimerResetIcon';
import RemoveIcon from '@/components/common/icons/RemoveIcon';
import { useState, useEffect, useRef } from 'react';
import useTimerList from '@/recoil/TimerBar/useTimerList';

type Props = {
  timer: Timer;
};

export default function Timer({ timer }: Props) {
  const { handleRemoveTimer } = useTimerList();
  const time = useRef(parseInt(timer.time, 10) * 60);
  const intervalId = useRef<NodeJS.Timer | undefined>(undefined);
  const [clock, setClock] = useState({
    min: time.current / 60,
    sec: time.current % 60,
  });

  const handleStartTimer = () => {
    intervalId.current = setInterval(() => {
      setClock({
        min: time.current / 60,
        sec: time.current % 60,
      });

      time.current--;

      if (time.current < 0) {
        clearInterval(intervalId.current);
        setClock({ min: 0, sec: 0 });
      }
    }, 1000);
  };

  const handleResetTimer = () => {
    clearInterval(intervalId.current);
    time.current = parseInt(timer.time, 10) * 60;
    handleStartTimer();
  };

  useEffect(() => {
    handleStartTimer();
    return () => clearInterval(intervalId.current);
  }, []);

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
        <button
          className={styles.reset}
          type='button'
          onClick={handleResetTimer}
        >
          <TimerResetIcon />
        </button>
        <button
          className={styles.close}
          type='button'
          onClick={() => handleRemoveTimer(timer.monsterName)}
        >
          <RemoveIcon />
        </button>
      </div>
    </li>
  );
}
