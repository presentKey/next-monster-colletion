'use client';
import { MainCategory } from '@/model/category';
import CategoryCard from '../../CategoryCard';
import styles from './css/SideNav.module.css';
import ArrowBarIcon from '../../icons/ArrowBarIcon';
import { useState } from 'react';

type Props = {
  categories: MainCategory[];
  param: string;
};

export default function SideNav({ categories, param }: Props) {
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <nav className={`sm-hidden ${styles.nav} ${open && styles['is-open']}`}>
      <ol>
        {open &&
          categories.map((category) => (
            <li className={styles.item} key={category.path}>
              <CategoryCard
                category={category}
                param={param}
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
