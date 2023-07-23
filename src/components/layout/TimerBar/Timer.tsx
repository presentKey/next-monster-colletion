import { Timer } from '@/model/information';
import Image from 'next/image';
import styles from './css/Timer.module.css';
import TimerResetIcon from '@/components/common/icons/TimerResetIcon';
import RemoveIcon from '@/components/common/icons/RemoveIcon';

type Props = {
  timer: Timer;
};

export default function Timer({ timer }: Props) {
  return (
    <li className={styles.timer}>
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
        <span className={styles.time}>{`${timer.time} : 00`}</span>
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
