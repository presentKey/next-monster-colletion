import { useRecoilState } from 'recoil';
import { timerBar } from './atoms';

export default function useTimerBar() {
  const [open, setOpen] = useRecoilState(timerBar);
  const toggleTimerBar = () => setOpen(!open);

  return { open, toggleTimerBar };
}
