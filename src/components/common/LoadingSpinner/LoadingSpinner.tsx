import SpinnerIcon from '../icons/SpinnerIcon';
import styles from './css/LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <SpinnerIcon />
    </div>
  );
}
