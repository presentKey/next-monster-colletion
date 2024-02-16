'use client';
import { SubCategory } from '@/model/category';
import styles from './css/index.module.css';
import TabItem from './TabItem';
import TabScrollEvent from '@/components/routes/category/layout/TableOfContents/TabScrollEvent';
import useActiveTabScroll from './hooks/useActiveTabScroll';

type Props = {
  subCategories: SubCategory[];
};

export default function TableOfContents({ subCategories }: Props) {
  const { tabRef, active, handleScrollTabClick, saveTabPosition } =
    useActiveTabScroll();

  return (
    <>
      <TabScrollEvent />
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
    </>
  );
}
