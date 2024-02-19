'use client';
import { SubCategory } from '@/model/category';
import styles from './css/index.module.css';
import TabItem from './TabItem';
import TabScrollEvent from '@/components/routes/category/layout/TableOfContents/TabScrollEvent';
import useActiveTabScroll from './hooks/useActiveTabScroll';
import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';

type Props = {
  subCategories: SubCategory[];
};

export default function TableOfContents({ subCategories }: Props) {
  const tabRef = useRef<HTMLElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const headingPositionRef = useRef<Record<string, number>>({});
  const [active, setActive] = useState(0);

  /** TOC Item을 클릭했을 때 해당 TOCHeading 위치로 이동하기 위해 위치 저장 */
  const saveHeadingPosition = useMemo(
    () =>
      throttle((headingElements: NodeListOf<HTMLHeadingElement>) => {
        headingElements.forEach((element) => {
          headingPositionRef.current[element.innerText] =
            element.getBoundingClientRect().top + window.scrollY;
        });
      }, 700),
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const headingEl = entry.target as HTMLHeadingElement;

          if (entry.isIntersecting) {
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

    const hadingElements = document.querySelectorAll(
      '.toc-heading'
    ) as NodeListOf<HTMLHeadingElement>;

    hadingElements.forEach((element) => observer.observe(element));

    saveHeadingPosition(hadingElements);

    window.addEventListener('resize', () =>
      saveHeadingPosition(hadingElements)
    );

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', () =>
        saveHeadingPosition(hadingElements)
      );
    };
  }, [saveHeadingPosition]);

  const handleTocClick = (title: string) => {
    window.scroll({ top: headingPositionRef.current[title] - 65 });
  };

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
              onClick={() => handleTocClick(title)}
              saveTabPosition={saveTabPosition}
            />
          ))}
        </ul>
      </aside>
    </>
  );
}
