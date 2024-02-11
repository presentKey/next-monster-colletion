'use client';
import { MainCategory } from '@/model/category';
import CategoryCard from '../../common/CategoryCard';
import styles from './css/index.module.css';
import ArrowBarIcon from '../../common/icons/ArrowBarIcon';
import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { usePathname } from 'next/navigation';

type Props = {
  categories: MainCategory[];
};

export default function SideCategoryNav({ categories }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [linePosition, setLinePosition] = useState<number | null>(null); // 첫 렌더링 시, 현재 경로에 해당하는 vertical line의 y position
  const navRef = useRef<HTMLElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  /** 클릭한 category item으로 vertical line 위치 조정 */
  const handleVerticalLineClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const lineElment = verticalLineRef.current;

    if (lineElment) {
      lineElment.style.transform = `translateY(${e.currentTarget.offsetTop}px)`;
      lineElment.style.opacity = '1';
    }
  };

  /** 첫 렌더링 시, 현재 경로에 해당하는 category item으로 vertical line 위치 설정 */
  useEffect(() => {
    const lineElment = verticalLineRef.current;

    if (lineElment && linePosition) {
      lineElment.style.transform = `translateY(${linePosition}px)`;
      lineElment.style.opacity = '1';
    }
  }, [linePosition]);

  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        const lineElment = verticalLineRef.current;
        if (window.matchMedia('(max-width: 48rem)').matches && lineElment) {
          lineElment.style.opacity = '0';
        }
      }, 700),
    []
  );

  /** 모바일 사이즈로 변경 시, verticalLine을 숨김 처리 */
  useEffect(() => {
    window.addEventListener('resize', throttleHandler);
    return () => window.removeEventListener('resize', throttleHandler);
  }, [throttleHandler]);

  return (
    <nav
      className={`sm-hidden ${styles.nav} ${isOpen && styles['is-open']}`}
      ref={navRef}
    >
      <button
        type='button'
        className={styles['toggle-button']}
        onClick={handleToggle}
        title={isOpen ? '카테고리 접기' : '카테고리 열기'}
      >
        <ArrowBarIcon />
      </button>
      <ol className={styles.list}>
        {categories.map((category) => (
          <li
            className={styles.item}
            key={category.path}
            onClick={(e: React.MouseEvent<HTMLLIElement>) =>
              handleVerticalLineClick(e)
            }
          >
            <CategoryCard
              category={category}
              imgSize='small'
              isTitleVisible={isOpen}
              onSetLinePosition={setLinePosition}
            />
          </li>
        ))}
        <div
          className={`${
            pathname.split('/')[1] === 'category' && styles['vertical-line']
          }`}
          ref={verticalLineRef}
        />
      </ol>
    </nav>
  );
}
