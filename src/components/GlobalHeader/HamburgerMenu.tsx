'use client';
import MenuIcon from '../icons/MenuIcon';
import useSideBar from '@/recoil/SideBar/useSideBar';

export default function HamburgerMenu() {
  const { toggleSideBar } = useSideBar();

  return (
    <>
      <MenuIcon onClick={toggleSideBar} />
    </>
  );
}
