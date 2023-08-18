'use client';
import { SubCategory } from '@/model/category';
import styles from './css/SubCategoryTab.module.css';
import useTabScroll from '@/recoil/SubCategoryTab/useTabScroll';
import useActiveTab from '@/recoil/SubCategoryTab/useActiveTab';
import { useEffect, useRef, useState, useCallback } from 'react';
import TabItem from './TabItem';

type TabPosition = {
  [key: number]: number;
};

type Props = {
  subCategories: SubCategory[];
};

export default function SubCategoryTab({ subCategories }: Props) {
  const [tabPosition, setTabPosition] = useState<TabPosition>({});
  const tabRef = useRef<HTMLElement>(null);
  const { getTabLablledby } = useTabScroll();
  const { active, handleActiveTab } = useActiveTab();
  const handleScrollTabClick = (e: React.MouseEvent, index: number) => {
    handleActiveTab(index);
    getTabLablledby(e);
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

  return (
    <aside className={styles.tab} ref={tabRef}>
      <ul className={styles.list}>
        {subCategories.map(({ title }, index) => (
          <TabItem
            key={title}
            index={index}
            active={active}
            title={title}
            scrollLeft={tabRef.current?.scrollLeft}
            onClick={handleScrollTabClick}
            saveTabPosition={saveTabPosition}
          />
        ))}
      </ul>
    </aside>
  );
}
