import TimerIcon from '../icons/TimerIcon';
import Label from './Label';
import styles from './css/TimerInfo.module.css';

type Props = {
  timer: string;
};

export default function TimerInfo({ timer }: Props) {
  return (
    <div className={styles.timer}>
      <div className={styles.icon}>
        <TimerIcon size='small' color='red' />
      </div>
      <Label text='타이머 등록' size='small' color='blue' />
      <span className={styles.time}>{`리젠: ${timer}분`}</span>
    </div>
  );
}
