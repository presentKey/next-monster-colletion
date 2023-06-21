import ThemeButton from '../ThemeButton';
import CloseIcon from '../icons/CloseIcon';
import styles from './css/SideBar.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function SideBar({ open, onClose }: Props) {
  return (
    <aside className={`${styles.sidebar} ${open && styles['is-open']}`}>
      <button className={styles.close} type='button' onClick={onClose}>
        <CloseIcon />
      </button>
      <ThemeButton />
      sidebar
    </aside>
  );
}
