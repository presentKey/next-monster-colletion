import { GoSearch } from 'react-icons/go';
import styles from './css/SearchIcon.module.css';

type Props = {
  color?: 'white';
  size?: 'normal' | 'big';
};

export default function SearchIcon({ color, size = 'normal' }: Props) {
  return (
    <GoSearch
      className={`${styles.icon} ${color === 'white' && styles.white} ${
        size === 'big' && styles.big
      }`}
    />
  );
}
