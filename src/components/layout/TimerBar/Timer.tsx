import { Timer } from '@/model/information';
import Image from 'next/image';
import styles from './css/Timer.module.css';
import TimerResetIcon from '@/components/common/icons/TimerResetIcon';
import RemoveIcon from '@/components/common/icons/RemoveIcon';
import { useState, useEffect, useRef, useCallback } from 'react';
import useTimerList from '@/recoil/TimerBar/useTimerList';

type Props = {
  timer: Timer;
};

export default function Timer({ timer }: Props) {
  const { handleRemoveTimer } = useTimerList();
  const time = useRef(parseInt(timer.time, 10) * 60);
  const intervalId = useRef<number | undefined>(undefined);
  const [clock, setClock] = useState({
    min: time.current / 60,
    sec: time.current % 60,
  });

  const handleStartTimer = useCallback(() => {
    intervalId.current = window.setInterval(() => {
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
  }, []);

  const handleResetTimer = useCallback(() => {
    clearInterval(intervalId.current);
    time.current = parseInt(timer.time, 10) * 60;
    handleStartTimer();
  }, [handleStartTimer, timer.time]);

  useEffect(() => {
    handleStartTimer();
    return () => clearInterval(intervalId.current);
  }, [handleStartTimer]);

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
          title='시간 초기화'
          onClick={handleResetTimer}
        >
          <TimerResetIcon />
        </button>
        <button
          className={styles.close}
          type='button'
          title='타이머 삭제'
          onClick={() => handleRemoveTimer(timer.monsterName)}
        >
          <RemoveIcon />
        </button>
      </div>
    </li>
  );
}
