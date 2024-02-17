'use client';
import { SubCategory } from '@/model/category';
import styles from './css/index.module.css';
import TabItem from './TabItem';
import TabScrollEvent from '@/components/routes/category/layout/TableOfContents/TabScrollEvent';
import useActiveTabScroll from './hooks/useActiveTabScroll';
import { useEffect, useRef, useState } from 'react';

type Props = {
  subCategories: SubCategory[];
};

export default function TableOfContents({ subCategories }: Props) {
  const tabRef = useRef<HTMLElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const headingEl = entry.target as HTMLHeadingElement;

            setActive(Number(headingEl.dataset.index));
            scrollPositionRef.current = window.scrollY;
          } else {
            const isScrollingUp =
              scrollPositionRef.current - window.scrollY > 0;

            if (isScrollingUp) setActive((prev) => prev - 1);
          }
        });
      },
      {
        rootMargin: '-88px 0px -80% 0px', // 48px(글로벌 헤더 높이) + 40px (윗 여백)
      }
    );

    const hadingElements = document.querySelectorAll('.toc-heading');

    hadingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const { handleScrollTabClick, saveTabPosition } = useActiveTabScroll();

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
