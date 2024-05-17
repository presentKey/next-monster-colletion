'use client';
import { MainCategory } from '@/model/category';
import Image from 'next/image';
import Link from 'next/link';
import styles from './css/index.module.css';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Props = {
  category: MainCategory;
  imgSize?: 'small' | 'normal';
  isTitleVisible?: boolean;
  onToggleSideBar?: () => void;
};

export default function CategoryCard({
  category: { title, path },
  imgSize = 'normal',
  isTitleVisible = true,
  onToggleSideBar,

  ...tooltipOptions
}: Props) {
  const pathname = usePathname();
  const cardRef = useRef<HTMLAnchorElement>(null);
  const handleClick = () => {
    onToggleSideBar && onToggleSideBar();
  };

  return (
    <>
      <Link
        className={`${styles.card}  ${
          pathname.split('/')[2] === path && styles['is-active']
        }`}
        href={`/category/${path}`}
        prefetch={false}
        onClick={handleClick}
        ref={cardRef}
        {...tooltipOptions}
      >
        <div className={styles.img}>
          <Image
            className={styles.front}
            src={`/images/category/icon/${path}.png`}
            alt={`${title} 카테고리`}
            width={imgSize === 'small' ? 28 : 34}
            height={imgSize === 'small' ? 28 : 34}
          />
          <Image
            className={styles.back}
            src='/images/momong.png'
            alt='모몽 이미지'
            width={imgSize === 'small' ? 28 : 34}
            height={imgSize === 'small' ? 28 : 34}
          />
        </div>

        <span
          className={`${styles.title} ${
            !isTitleVisible && styles['title-hidden']
          }`}
        >
          {title}
        </span>
      </Link>
    </>
  );
}
