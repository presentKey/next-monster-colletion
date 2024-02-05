'use client';
import useActiveTab from '@/recoil/SubCategoryTab/useActiveTab';
import useScrollTabPanel from '@/recoil/SubCategoryTab/useScrollTabPanel';
import calcScrollAmount from '@/utils/calcScrollAmount';
import tabByCategory from '@/utils/tabByCategory';
import { throttle } from 'lodash';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

export default function TabScrollEvent() {
  const pathname = usePathname();
  const { panelPosition } = useScrollTabPanel();
  const { handleActiveTab } = useActiveTab();

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const scrolledAmount = calcScrollAmount(window.scrollY + 40, 'user');
        const newActiveTab = tabByCategory(
          pathname.split('/')[2],
          scrolledAmount,
          panelPosition
        );

        handleActiveTab(newActiveTab);
      }, 200),
    [handleActiveTab, panelPosition, pathname]
  );

  const upadteActiveTabOnScroll = useCallback(throttleHandler, [
    throttleHandler,
  ]);

  useEffect(() => {
    window.addEventListener('scroll', upadteActiveTabOnScroll);

    return () => {
      window.removeEventListener('scroll', upadteActiveTabOnScroll);
    };
  }, [upadteActiveTabOnScroll]);

  return <></>;
}
