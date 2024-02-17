'use client';
import { dohyeon } from '@/utils/fonts';
import styles from './css/TOCHeading.module.css';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import useScrollTabPanel from '@/recoil/SubCategoryTab/useScrollTabPanel';
import { throttle } from 'lodash';
import useYoutube from '@/recoil/Youtube/useYoutube';

type Props = {
  title: string;
  index: number;
};

export default function TOCHeading({ title, index }: Props) {
  const headRef = useRef<HTMLHeadingElement>(null);

  // const { tabLable, scrollToTabPanel, savePanelPosition, clearTabLable } =
  //   useScrollTabPanel();
  // const { youtubeToggle } = useYoutube();

  // const throttleHandler = useMemo(
  //   () =>
  //     throttle(() => {
  //       if (headRef.current) {
  //         const position =
  //           window.scrollY + headRef.current.getBoundingClientRect().top;
  //         savePanelPosition(title, position);
  //       }
  //     }, 700),
  //   [title, savePanelPosition]
  // );

  // const detectTabPanelPositon = useCallback(throttleHandler, [throttleHandler]);

  // useEffect(() => {
  //   if (tabLable === title) {
  //     const position = headRef.current?.getBoundingClientRect().top;
  //     scrollToTabPanel(position ?? 0);
  //   }

  //   return () => {
  //     clearTabLable();
  //   };
  // }, [tabLable, title, scrollToTabPanel, clearTabLable]);

  // useEffect(() => {
  //   detectTabPanelPositon();
  // }, [detectTabPanelPositon]);

  // // YouTube 버튼 클릭 시, TabPanel 위치 재탐색
  // useEffect(() => {
  //   youtubeToggle && detectTabPanelPositon();
  // }, [youtubeToggle, detectTabPanelPositon]);

  // useEffect(() => {
  //   window.addEventListener('resize', detectTabPanelPositon);
  //   return () => {
  //     window.removeEventListener('resize', detectTabPanelPositon);
  //   };
  // }, [detectTabPanelPositon]);

  return (
    <h2
      className={`${styles.title} ${dohyeon.className} toc-heading`}
      data-index={index}
      ref={headRef}
    >
      <span>{title}</span>
    </h2>
  );
}
