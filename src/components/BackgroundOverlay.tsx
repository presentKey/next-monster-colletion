import styles from './css/BackgroundOverlay.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BackgroundOverlay({ open, onClose }: Props) {
  return (
    <div
      className={`${styles.background} ${open && styles['is-open']}`}
      onClick={onClose}
    />
  );
}
