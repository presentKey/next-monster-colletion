import styles from './css/Label.module.css';

type Props = {
  text: string;
  size?: 'small' | 'normal';
  color?: 'green' | 'yellow' | 'blue';
};

export default function Label({
  text,
  size = 'normal',
  color = 'green',
}: Props) {
  return (
    <div
      className={`${styles.label} ${size === 'small' && styles.small} ${
        color && styles[getColorStyle(color)]
      }`}
    >
      {text}
    </div>
  );
}

function getColorStyle(color: string) {
  switch (color) {
    case 'yellow':
      return 'yellow';
    case 'blue':
      return 'blue';
    default:
      return 'green';
  }
}
