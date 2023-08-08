import SpinnerIcon from '../icons/SpinnerIcon';
import styles from './css/LoadingSpinner.module.css';

type Props = {
  size?: 'small';
};

export default function LoadingSpinner({ size }: Props) {
  return (
    <div className={`${styles.container} ${size === 'small' && styles.small}`}>
      <SpinnerIcon />
    </div>
  );
}
