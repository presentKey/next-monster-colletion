import { GoSearch } from 'react-icons/go';
import styles from './css/SearchIcon.module.css';

type Props = {
  color?: 'white';
};

export default function SearchIcon({ color }: Props) {
  return (
    <GoSearch
      className={`${styles.icon} ${color === 'white' && styles.white}`}
    />
  );
}
