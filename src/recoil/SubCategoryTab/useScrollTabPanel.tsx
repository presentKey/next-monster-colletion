import { useRecoilState } from 'recoil';
import { tabId, tabPanelPositionStorage } from './atoms';
import calcScrollAmount from '@/utils/calcScrollAmount';
import { useCallback, useEffect } from 'react';

export default function useScrollTabPanel() {
  const [tabLable, setTabLabel] = useRecoilState(tabId);
  const [panelPosition, setPanelPosition] = useRecoilState(
    tabPanelPositionStorage
  );

  const getTabLabelOnClick = (e: React.MouseEvent) => {
    setTabLabel(e.currentTarget.getAttribute('aria-labelledby') || '');
  };

  const clearTabLable = () => setTabLabel('');

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

  // subCategoryTab 클릭 이벤트 발생 후, 페이지 이동 시 tabLable 초기화
  useEffect(() => setTabLabel(''), [setTabLabel]);

  return {
    tabLable,
    panelPosition,
    getTabLabelOnClick,
    clearTabLable,
    scrollToTabPanel,
    savePanelPosition,
  };
}
