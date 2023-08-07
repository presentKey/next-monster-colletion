import CloseIcon from '../icons/CloseIcon';
import styles from './css/CloseButton.module.css';

type Props = {
  onClick: () => void;
};

export default function CloseButton({ onClick }: Props) {
  return (
    <button className={styles.close} type='button' onClick={onClick}>
      <CloseIcon />
    </button>
  );
}
