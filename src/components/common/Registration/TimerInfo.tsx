'use client';
import TimerIcon from '@/components/common/icons/TimerIcon';
import Label from './Label';
import styles from './css/TimerInfo.module.css';
import useTimerList from '@/recoil/TimerBar/useTimerList';

type Props = {
  timer: string;
  monsterName: string;
};

export default function TimerInfo({ timer, monsterName }: Props) {
  const { handleAddTimerList } = useTimerList();
  const timerDisabled = timer.includes('?') || timer.includes('시간');

  return (
    <div className={`${styles.timer} ${timerDisabled && styles.disabled}`}>
      <div className={styles.icon}>
        <TimerIcon size='small' color='red' />
      </div>
      {!timerDisabled && (
        <Label
          text='타이머 등록'
          size='small'
          color='blue'
          type='button'
          onClick={() => {
            handleAddTimerList(monsterName, timer);
          }}
        />
      )}
      <span className={styles.time}>{`리젠: ${
        timer.includes('시간') ? timer : `${timer}분`
      }`}</span>
    </div>
  );
}
