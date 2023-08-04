import { useRecoilState } from 'recoil';
import { tabId } from './atoms';
import calcScrollAmount from '@/utils/calcScrollAmount';

export default function useTabScroll() {
  const [tabLable, setTabLabel] = useRecoilState(tabId);
  const getTabLablledby = (e: React.MouseEvent) => {
    setTabLabel(e.currentTarget.getAttribute('aria-labelledby') || '');
  };
  const scrollToTabPanel = (position: number) => {
    window.scrollBy({
      top: calcScrollAmount(position),
    });
  };

  return {
    tabLable,
    getTabLablledby,
    scrollToTabPanel,
  };
}
