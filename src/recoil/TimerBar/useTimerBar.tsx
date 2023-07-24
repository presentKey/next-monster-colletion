import { useRecoilState, useRecoilValue } from 'recoil';
import { timerBar } from './atoms';
import { timerListLength } from './selectors';
import { toast } from 'react-toastify';

export default function useTimerBar() {
  const [open, setOpen] = useRecoilState(timerBar);
  const timersLength = useRecoilValue(timerListLength);
  const toggleTimerBar = () => {
    if (timersLength <= 0) {
      setOpen(false);
      toast.dismiss();
      toast.info('타이머에 등록된 몬스터가 없습니다.');
      return;
    }

    setOpen(!open);
  };

  return { open, toggleTimerBar };
}
