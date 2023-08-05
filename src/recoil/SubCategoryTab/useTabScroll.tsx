import { useRecoilState } from 'recoil';
import { tabId, tabPanelPositionStorage } from './atoms';
import calcScrollAmount from '@/utils/calcScrollAmount';
import { useCallback } from 'react';

export default function useTabScroll() {
  const [tabLable, setTabLabel] = useRecoilState(tabId);
  const [panelPosition, setPanelPosition] = useRecoilState(
    tabPanelPositionStorage
  );

  const getTabLablledby = (e: React.MouseEvent) => {
    setTabLabel(e.currentTarget.getAttribute('aria-labelledby') || '');
  };

  const scrollToTabPanel = (position: number) => {
    window.scrollBy({
      top: calcScrollAmount(position),
    });
  };

  const savePanelPosition = useCallback(
    (tabTitle: string, position: number) => {
      setPanelPosition((prev) => ({ ...prev, [tabTitle]: position }));
    },
    [setPanelPosition]
  );

  return {
    tabLable,
    panelPosition,
    getTabLablledby,
    scrollToTabPanel,
    savePanelPosition,
  };
}
