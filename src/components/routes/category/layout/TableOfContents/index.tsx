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
  const headingElementsRef = useRef<NodeListOf<HTMLHeadingElement>>();
  const headingPositionRef = useRef<Record<string, number>>({});
  const [active, setActive] = useState(0);

  /** TOC Item을 클릭했을 때 해당 TOCHeading 위치로 이동하기 위해 Heading 위치 저장 */
  const saveHeadingPosition = useMemo(
    () =>
      throttle(() => {
        const headingElements = headingElementsRef.current;
        if (!headingElements) return;

        headingElements.forEach((element) => {
          headingPositionRef.current[element.innerText] =
            element.getBoundingClientRect().top + window.scrollY;
        });
      }, 700),
    []
  );

  /** scroll 시, TOC의 active 상태를 변경 */
  const updateActiveOnScroll = useMemo(
    () =>
      throttle(() => {
        const headingElements = headingElementsRef.current;
        if (!headingElements || headingElements.length <= 1) return;

        // 현재 스크롤 값이 heading element의 위치값보다 크다면, 해당 TOC item의 active 상태 변경
        headingElements.forEach((element) => {
          if (
            window.scrollY >=
            element.getBoundingClientRect().top + window.scrollY - 100
          ) {
            setActive(Number(element.dataset.index));
          }
        });

        // 스크롤이 맨 아래 위치한다면, 마지막 TOC item의 active 상태 변경
        if (
          Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
          document.body.offsetHeight
        ) {
          setActive(headingElements.length - 1);
          return;
        }
      }, 200),
    []
  );

  /** resize, scroll 이벤트 설정 */
  useEffect(() => {
    const hadingElements = document.querySelectorAll(
      '.toc-heading'
    ) as NodeListOf<HTMLHeadingElement>;
    headingElementsRef.current = hadingElements;

    saveHeadingPosition();
    updateActiveOnScroll();

    window.addEventListener('resize', saveHeadingPosition);
    window.addEventListener('scroll', updateActiveOnScroll);

    return () => {
      window.removeEventListener('resize', saveHeadingPosition);
      window.removeEventListener('scroll', updateActiveOnScroll);
    };
  }, [saveHeadingPosition, updateActiveOnScroll]);

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
