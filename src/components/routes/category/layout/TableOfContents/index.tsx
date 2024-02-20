'use client';
import { SubCategory } from '@/model/category';
import styles from './css/index.module.css';
import TocItem from './TocItem';
import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import useYoutube from '@/recoil/Youtube/useYoutube';

type Props = {
  subCategories: SubCategory[];
};

export default function TableOfContents({ subCategories }: Props) {
  const tocRef = useRef<HTMLElement>(null);
  const headingElementsRef = useRef<NodeListOf<HTMLHeadingElement>>(); // heading Elements 저장
  const headingPositionRef = useRef<Record<string, number>>({}); // heading의 절대위치 저장
  const mobileTocItemElementsRef = useRef<NodeListOf<HTMLLIElement>>(); // tocItem Elements 저장 (모바일 toc 가로스크롤에 사용)
  const mobileTocItemPositionRef = useRef<Record<string, number>>({}); //  tocItem의 절대위치 저장 (모바일 toc 가로스크롤에 사용)
  const { youtubeToggle } = useYoutube();
  const [active, setActive] = useState(0);

  /** tocItem 클릭 시, 해당 heading으로 스크롤 이동 */
  const handleTocItemClick = (title: string) => {
    window.scroll({
      top: window.matchMedia('(max-width: 48rem)').matches
        ? headingPositionRef.current[title] - 85 // 모바일
        : headingPositionRef.current[title] - 65, // 데스크탑
    });
  };

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

        // 브라우저 크기에 따라 판별 위치 조정
        const distance = window.matchMedia('(max-width: 48rem)').matches
          ? 135
          : 100;

        // 현재 스크롤 값이 heading element의 위치값보다 크다면, 해당 TOC item의 active 상태 변경
        headingElements.forEach((element) => {
          if (
            window.scrollY >=
            element.getBoundingClientRect().top + window.scrollY - distance
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
    const haedingElements = document.querySelectorAll(
      '.toc-heading'
    ) as NodeListOf<HTMLHeadingElement>;
    headingElementsRef.current = haedingElements;

    saveHeadingPosition();
    updateActiveOnScroll();

    window.addEventListener('resize', saveHeadingPosition);
    window.addEventListener('scroll', updateActiveOnScroll);

    return () => {
      window.removeEventListener('resize', saveHeadingPosition);
      window.removeEventListener('scroll', updateActiveOnScroll);
    };
  }, [saveHeadingPosition, updateActiveOnScroll]);

  /** youtube 버튼 클릭 시, TOCHeading 위치 재서렂ㅇ */
  useEffect(saveHeadingPosition, [youtubeToggle, saveHeadingPosition]);

  /** 모바일 toc의 가로스크롤을 위해 tocItem Elements를 저장 */
  const SaveTocItemPositionForMobile = useMemo(
    () =>
      throttle(() => {
        if (!window.matchMedia('(max-width: 48rem)').matches) return;

        const tocItemElements = mobileTocItemElementsRef.current;
        const tocElement = tocRef.current;

        if (!tocElement || !tocItemElements || tocItemElements.length <= 1)
          return;

        tocItemElements.forEach((element, index) => {
          mobileTocItemPositionRef.current[index] =
            element.getBoundingClientRect().left + tocElement.scrollLeft;
        });
      }, 700),
    []
  );

  /** 모바일 toc resize 이벤트 */
  useEffect(() => {
    const tocItemElements = tocRef.current?.querySelectorAll(
      '.toc-item'
    ) as NodeListOf<HTMLLIElement>;
    mobileTocItemElementsRef.current = tocItemElements;

    SaveTocItemPositionForMobile();

    window.addEventListener('resize', SaveTocItemPositionForMobile);

    return () =>
      window.removeEventListener('resize', SaveTocItemPositionForMobile);
  }, [SaveTocItemPositionForMobile]);

  /** 모바일 toc 가로 스크롤 */
  useEffect(() => {
    if (window.matchMedia('(max-width: 48rem)').matches) {
      tocRef.current?.scrollTo({
        left: mobileTocItemPositionRef.current[active] - 50,
        behavior: 'smooth',
      });
    }
  }, [active]);

  return (
    <aside className={styles.toc} ref={tocRef}>
      <ul className={styles.list}>
        {subCategories.map(({ title }, index) => (
          <TocItem
            key={title}
            index={index}
            active={active}
            title={title}
            onClick={() => handleTocItemClick(title)}
          />
        ))}
      </ul>
    </aside>
  );
}
