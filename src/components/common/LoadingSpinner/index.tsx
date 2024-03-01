import SpinnerIcon from '../icons/SpinnerIcon';
import styles from './css/index.module.css';

type Props = {
  position?: 'top';
  size?: 'small';
  color?: 'red';
};

export default function LoadingSpinner({ position, size, color }: Props) {
  return (
    <div
      className={`${styles.container} 
      ${size === 'small' && styles.small} 
      ${position === 'top' && styles.top}
      ${color === 'red' && styles.red}
      `}
    >
      <SpinnerIcon />
    </div>
  );
}
