import styles from './css/MenuIcon.module.css';
import { FiMenu } from 'react-icons/fi';

type Props = {
  onClick: () => void;
};

export default function MenuIcon({ onClick }: Props) {
  return <FiMenu className={styles.icon} onClick={onClick} />;
}
