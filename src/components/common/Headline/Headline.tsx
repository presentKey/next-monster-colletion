'use client';
import { dohyeon } from '@/utils/fonts';
import styles from './css/Headline.module.css';
import { useRef, useEffect } from 'react';
import useTabScroll from '@/recoil/SubCategoryTab/useTabScroll';

type Props = {
  title: string;
};

export default function Headline({ title }: Props) {
  const headRef = useRef<HTMLHeadingElement>(null);
  const { tabLable, scrollToTabPanel } = useTabScroll();

  useEffect(() => {
    if (tabLable === title) {
      const position = headRef.current?.getBoundingClientRect().top;
      scrollToTabPanel(position ?? 0);
    }
  }, [tabLable, title, scrollToTabPanel]);
  return (
    <h2 className={`${styles.title} ${dohyeon.className}`} ref={headRef}>
      <span>{title}</span>
    </h2>
  );
}
