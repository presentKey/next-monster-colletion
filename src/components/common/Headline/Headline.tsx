'use client';
import { dohyeon } from '@/utils/fonts';
import styles from './css/Headline.module.css';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import useTabScroll from '@/recoil/SubCategoryTab/useTabScroll';
import { throttle } from 'lodash';

type Props = {
  title: string;
};

export default function Headline({ title }: Props) {
  const headRef = useRef<HTMLHeadingElement>(null);
  const { tabLable, scrollToTabPanel, savePanelPosition } = useTabScroll();

  useEffect(() => {
    if (tabLable === title) {
      const position = headRef.current?.getBoundingClientRect().top;
      scrollToTabPanel(position ?? 0);
    }
  }, [tabLable, title, scrollToTabPanel]);

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        if (headRef.current) {
          const position =
            window.scrollY + headRef.current.getBoundingClientRect().top;

          savePanelPosition(title, position);
        }
      }, 700),
    [title, savePanelPosition]
  );

  const detectTabPanelPositon = useCallback(throttleHandler, [throttleHandler]);

  useEffect(() => {
    detectTabPanelPositon();
  }, [detectTabPanelPositon]);

  // 스크롤 이벤트 위치: <TabScrollEvent> 컴포넌트
  useEffect(() => {
    window.addEventListener('resize', detectTabPanelPositon);
    return () => {
      window.removeEventListener('resize', detectTabPanelPositon);
    };
  }, [detectTabPanelPositon]);

  return (
    <h2 className={`${styles.title} ${dohyeon.className}`} ref={headRef}>
      <span>{title}</span>
    </h2>
  );
}
