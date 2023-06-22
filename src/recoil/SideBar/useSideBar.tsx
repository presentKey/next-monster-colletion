import { useRecoilState } from 'recoil';
import { sideBar } from './atoms';

export default function useSideBar() {
  const [open, setOpen] = useRecoilState(sideBar);
  const toggleSideBar = () => setOpen(!open);

  return { open, toggleSideBar };
}
