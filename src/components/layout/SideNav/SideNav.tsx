'use client';
import { MainCategory } from '@/model/category';
import CategoryCard from '../../common/CategoryCard/CategoryCard';
import styles from './css/SideNav.module.css';
import ArrowBarIcon from '../../common/icons/ArrowBarIcon';
import { useEffect, useRef, useState } from 'react';

type Props = {
  categories: MainCategory[];
};

export default function SideNav({ categories }: Props) {
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen((prev) => !prev);
  const navRef = useRef<HTMLElement>(null);
  const setNavHeight = () => {
    if (navRef.current) {
      if (
        Math.ceil((window.scrollY + window.innerHeight) / 10) * 10 >=
        document.body.offsetHeight
      ) {
        // css
        // 3rem: --global-header-height, 6.25rem: --footer-height
        navRef.current.style.minHeight = 'calc(100vh - 3rem - 6.25rem)';
        navRef.current.style.maxHeight = 'calc(100vh - 3rem - 6.25rem)';
        return;
      } else {
        navRef.current.style.minHeight = 'calc(100vh - 3rem)';
        navRef.current.style.maxHeight = 'calc(100vh - 3rem)';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', setNavHeight);
    return () => window.addEventListener('scroll', setNavHeight);
  }, []);

  return (
    <nav
      className={`sm-hidden ${styles.nav} ${open && styles['is-open']}`}
      ref={navRef}
    >
      <ol className={styles.list}>
        {open &&
          categories.map((category) => (
            <li className={styles.item} key={category.path}>
              <CategoryCard
                category={category}
                direction='row'
                imgSize='small'
              />
            </li>
          ))}
      </ol>
      <button
        className={styles['toggle-button']}
        type='button'
        onClick={handleToggle}
        title={`${open ? '카테고리 닫기' : '카테고리 열기'}`}
      >
        <ArrowBarIcon />
      </button>
    </nav>
  );
}
