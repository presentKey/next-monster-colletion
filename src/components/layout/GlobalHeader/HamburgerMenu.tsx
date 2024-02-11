'use client';
import MenuIcon from '../../common/icons/MenuIcon';
import useMobileSideMenu from '@/recoil/MobileSideMenu/useMobileSideMenu';
import styles from './css/HamburgerMenu.module.css';

export default function HamburgerMenu() {
  const { toggleSideBar } = useMobileSideMenu();

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
