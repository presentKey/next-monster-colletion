'use client';
import { dohyeon } from '@/utils/fonts';
import styles from './css/TapPanel.module.css';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import useScrollTabPanel from '@/recoil/SubCategoryTab/useScrollTabPanel';
import { throttle } from 'lodash';
import useYoutube from '@/recoil/Youtube/useYoutube';

type Props = {
  title: string;
};

export default function TabPanel({ title }: Props) {
  const headRef = useRef<HTMLHeadingElement>(null);
  const { tabLable, scrollToTabPanel, savePanelPosition, clearTabLable } =
    useScrollTabPanel();
  const { youtubeToggle } = useYoutube();

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
    if (tabLable === title) {
      const position = headRef.current?.getBoundingClientRect().top;
      scrollToTabPanel(position ?? 0);
    }

    return () => {
      clearTabLable();
    };
  }, [tabLable, title, scrollToTabPanel, clearTabLable]);

  useEffect(() => {
    detectTabPanelPositon();
  }, [detectTabPanelPositon]);

  // YouTube 버튼 클릭 시, TabPanel 위치 재탐색
  useEffect(() => {
    youtubeToggle && detectTabPanelPositon();
  }, [youtubeToggle, detectTabPanelPositon]);

  // 스크롤 이벤트의 위치는 <TabScrollEvent> 컴포넌트
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
