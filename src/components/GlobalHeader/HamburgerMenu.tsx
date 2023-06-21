'use client';
import { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import SideBarPortal from '../SideBar/SideBarPortal';
import MenuIcon from '../icons/MenuIcon';
import BackgroundOverlay from '../BackgroundOverlay';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  return (
    <>
      <MenuIcon onClick={toggleMenu} />
      {open && (
        <SideBarPortal>
          <SideBar />
          <BackgroundOverlay />
        </SideBarPortal>
      )}
    </>
  );
}
