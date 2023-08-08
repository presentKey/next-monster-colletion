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
          toast.info('타이머에 존재하는 몬스터입니다.');
          return prev;
        }
      }

      toast.success(`${monsterName} 타이머가 등록되었습니다.`);
      return [...prev, { monsterName, time }];
    });

  const handleRemoveTimer = (monsterName: string) =>
    setTimers((prev) =>
      prev.filter((timer) => timer.monsterName !== monsterName)
    );

  return { timers, handleAddTimerList, handleRemoveTimer };
}
