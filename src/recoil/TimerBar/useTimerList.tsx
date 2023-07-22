import { useRecoilState } from 'recoil';
import { timerList } from './atoms';
import { toast } from 'react-toastify';

export default function useTimerList() {
  const [timers, setTimers] = useRecoilState(timerList);

  const handleAddTimerList = (monsterName: string, time: string) =>
    setTimers((prev) => {
      for (const timer of prev) {
        if (timer.monsterName === monsterName) {
          toast.dismiss();
          toast.info('이미 등록된 몬스터입니다.');
          return prev;
        }
      }
      return [...prev, { monsterName, time }];
    });

  return { timers, handleAddTimerList };
}
