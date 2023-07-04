import { MdOutlineTimer } from 'react-icons/md';
import styles from './css/TimerIcon.module.css';

type Props = {
  size?: 'small' | 'big';
  color?: 'red' | 'black';
};

export default function TimerIcon({ size = 'big', color = 'black' }: Props) {
  return (
    <MdOutlineTimer
      className={`${styles.icon} ${size === 'small' && styles.small} ${
        color === 'red' && styles.red
      }`}
    />
  );
}
