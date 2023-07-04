'use client';
import MenuIcon from '../../common/icons/MenuIcon';
import useSideBar from '@/recoil/SideBar/useSideBar';
import styles from './css/HamburgerMenu.module.css';

export default function HamburgerMenu() {
  const { toggleSideBar } = useSideBar();

  return (
    <>
      <button
        className={`sm-only ${styles.button}`}
        type='button'
        onClick={toggleSideBar}
      >
        <MenuIcon />
      </button>
    </>
  );
}
