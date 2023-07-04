import TimerIcon from '@/components/icons/TimerIcon';
import Label from './Label';
import styles from './css/TimerInfo.module.css';

type Props = {
  timer: string;
};

export default function TimerInfo({ timer }: Props) {
  const timerDisabled = timer.includes('?') || timer.includes('시간');

  return (
    <div className={`${styles.timer} ${timerDisabled && styles.disabled}`}>
      <div className={styles.icon}>
        <TimerIcon size='small' color='red' />
      </div>
      {!timerDisabled && <Label text='타이머 등록' size='small' color='blue' />}
      <span className={styles.time}>{`리젠: ${
        timer.includes('시간') ? timer : `${timer}분`
      }`}</span>
    </div>
  );
}
