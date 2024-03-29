import { timerListLength } from '@/recoil/TimerBar/selectors';
import { useRecoilValue } from 'recoil';
import styles from './css/index.module.css';

type Props = {
  position?: 'desktop';
};

export default function TimerBadge({ position }: Props) {
  const timerLength = useRecoilValue(timerListLength);

  return (
    <>
      {timerLength > 0 && (
        <span
          className={`${styles.badge} ${timerLength >= 10 && styles.over} ${
            position && styles.desktop
          }`}
        >
          {timerLength >= 10 ? '9+' : timerLength}
        </span>
      )}
    </>
  );
}
