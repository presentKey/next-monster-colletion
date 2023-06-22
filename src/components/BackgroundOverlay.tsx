import styles from './css/BackgroundOverlay.module.css';

type Props = {
  onClose: () => void;
};

export default function BackgroundOverlay({ onClose }: Props) {
  return <div className={styles.background} onClick={onClose} />;
}
