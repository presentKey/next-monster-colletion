'use client';
import { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import SideBarPortal from '../SideBar/SideBarPortal';
import MenuIcon from '../icons/MenuIcon';
import BackgroundOverlay from '../BackgroundOverlay';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <>
      <MenuIcon onClick={toggleMenu} />

      <SideBarPortal>
        <SideBar open={open} onClose={toggleMenu} />
        <BackgroundOverlay open={open} onClose={toggleMenu} />
      </SideBarPortal>
    </>
  );
}
