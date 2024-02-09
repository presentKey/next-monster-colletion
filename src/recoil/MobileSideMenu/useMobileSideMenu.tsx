import { useRecoilState } from 'recoil';
import { sideBar } from './atoms';

export default function useMobileSideMenu() {
  const [open, setOpen] = useRecoilState(sideBar);
  const toggleSideBar = () => setOpen(!open);

  return { open, toggleSideBar };
}
