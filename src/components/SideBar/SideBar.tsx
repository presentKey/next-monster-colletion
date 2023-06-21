'use client';
import ThemeButton from '../ThemeButton';
import CloseIcon from '../icons/CloseIcon';
import styles from './css/SideBar.module.css';
import useSideBar from '@/recoil/SideBar/useSideBar';
import BackgroundOverlay from '../BackgroundOverlay';

export default function SideBar() {
  const { open, toggleSideBar } = useSideBar();

  return (
    <>
      <aside className={`${styles.sidebar} ${open && styles['is-open']}`}>
        <button className={styles.close} type='button' onClick={toggleSideBar}>
          <CloseIcon />
        </button>
        <div className={styles.theme}>
          <span>화면 테마</span>
          <ThemeButton />
        </div>
        sidebar
      </aside>
      {open && <BackgroundOverlay onClose={toggleSideBar} />}
    </>
  );
}
