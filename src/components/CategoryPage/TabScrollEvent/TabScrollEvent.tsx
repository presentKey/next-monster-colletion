'use client';
import useActiveTab from '@/recoil/SubCategoryTab/useActiveTab';
import useTabScroll from '@/recoil/SubCategoryTab/useTabScroll';
import calcScrollAmount from '@/utils/calcScrollAmount';
import tabByCategory from '@/utils/tabByCategory';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function TabScrollEvent() {
  const pathname = usePathname();
  const { panelPosition } = useTabScroll();
  const { handleActiveTab } = useActiveTab();

  const upadteActiveTabOnScroll = useCallback(() => {
    const scrolledAmount = calcScrollAmount(window.scrollY + 10, 'user');

    const newActiveTab = tabByCategory(
      pathname.split('/')[2],
      scrolledAmount,
      panelPosition
    );

    handleActiveTab(newActiveTab);
  }, [panelPosition, pathname, handleActiveTab]);

  useEffect(() => {
    window.addEventListener('scroll', upadteActiveTabOnScroll);

    return () => {
      window.removeEventListener('scroll', upadteActiveTabOnScroll);
    };
  }, [upadteActiveTabOnScroll]);

  return <></>;
}
