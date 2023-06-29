import styles from './css/Label.module.css';

type Props = {
  text: string;
  size?: 'small' | 'normal';
  color?: 'green' | 'yellow';
};

export default function Label({
  text,
  size = 'normal',
  color = 'green',
}: Props) {
  return (
    <div
      className={`${styles.label} ${size === 'small' && styles.small} ${
        color === 'yellow' && styles.yellow
      }`}
    >
      {text}
    </div>
  );
}
