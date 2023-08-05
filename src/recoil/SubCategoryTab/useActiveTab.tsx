import { useRecoilState } from 'recoil';
import { activeTab } from './atoms';

export default function useActiveTab() {
  const [active, setActive] = useRecoilState(activeTab);
  const handleActiveTab = (tabIndex: number) => {
    setActive(tabIndex);
  };

  return { active, handleActiveTab };
}
