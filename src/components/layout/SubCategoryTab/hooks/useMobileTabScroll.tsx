import useScrollTabPanel from '@/recoil/SubCategoryTab/useScrollTabPanel';
import useActiveTab from '@/recoil/SubCategoryTab/useActiveTab';
import { useEffect, useRef, useState, useCallback } from 'react';

type TabPosition = {
  [key: number]: number;
};

export default function useMobileTabScroll() {
  const [tabPosition, setTabPosition] = useState<TabPosition>({});
  const tabRef = useRef<HTMLElement>(null);
  const { getTabLabelOnClick } = useScrollTabPanel();
  const { active, handleActiveTab } = useActiveTab();
  const handleScrollTabClick = (e: React.MouseEvent, index: number) => {
    handleActiveTab(index);
    getTabLabelOnClick(e);
  };

  const saveTabPosition = useCallback(
    (index: number, position: number) =>
      setTabPosition((prev) => ({ ...prev, [index]: position })),
    []
  );

  useEffect(() => {
    if (window.matchMedia('(max-width: 48rem)').matches) {
      tabRef.current?.scrollTo({
        left: tabPosition[active] - 50,
        behavior: 'smooth',
      });
    }
  }, [tabPosition, active]);

  useEffect(() => {
    return () => {
      setTabPosition({});
    };
  }, []);
  return { tabRef, active, handleScrollTabClick, saveTabPosition };
}
