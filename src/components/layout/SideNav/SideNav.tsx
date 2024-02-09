'use client';
import { MainCategory } from '@/model/category';
import CategoryCard from '../../common/CategoryCard/CategoryCard';
import styles from './css/SideNav.module.css';
import ArrowBarIcon from '../../common/icons/ArrowBarIcon';
import { useRef, useState } from 'react';

type Props = {
  categories: MainCategory[];
};

export default function SideNav({ categories }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const handleToggle = () => setIsOpen((prev) => !prev);
  const navRef = useRef<HTMLElement>(null);

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
          <li className={styles.item} key={category.path}>
            <CategoryCard
              category={category}
              imgSize='small'
              isTitleVisible={isOpen}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
