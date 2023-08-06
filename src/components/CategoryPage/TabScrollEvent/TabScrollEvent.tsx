'use client';
import useActiveTab from '@/recoil/SubCategoryTab/useActiveTab';
import useTabScroll from '@/recoil/SubCategoryTab/useTabScroll';
import calcScrollAmount from '@/utils/calcScrollAmount';
import tabByCategory from '@/utils/tabByCategory';
import { throttle } from 'lodash';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

export default function TabScrollEvent() {
  const pathname = usePathname();
  const { panelPosition } = useTabScroll();
  const { handleActiveTab } = useActiveTab();

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const scrolledAmount = calcScrollAmount(window.scrollY + 10, 'user');
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

  // <Link> 다른 카테고리 페이지 이동 시, 스크롤 최상단 위치
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return <></>;
}
