import { FiChevronRight } from 'react-icons/fi';
import styles from './css/ChevronIcon.module.css';

type Props = {
  size?: 'normal';
};

export default function ChevronIcon({ size }: Props) {
  return <FiChevronRight className={size && styles.normal} />;
}
