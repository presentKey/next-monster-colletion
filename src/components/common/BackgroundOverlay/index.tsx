import styles from './css/index.module.css';

type Props = {
  onClose: () => void;
};

export default function BackgroundOverlay({ onClose }: Props) {
  return <div className={`sm-only ${styles.background}`} onClick={onClose} />;
}
