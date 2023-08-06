'use client';
import { MainCategory } from '@/model/category';
import CategoryCard from '../../common/CategoryCard/CategoryCard';
import styles from './css/SideNav.module.css';
import ArrowBarIcon from '../../common/icons/ArrowBarIcon';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { timerListLength } from '@/recoil/TimerBar/selectors';

type Props = {
  categories: MainCategory[];
};

export default function SideNav({ categories }: Props) {
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen((prev) => !prev);
  const timerLength = useRecoilValue(timerListLength);

  return (
    <nav className={`sm-hidden ${styles.nav} ${open && styles['is-open']}`}>
      <ol className={`${timerLength > 0 && styles['timerbar-open']}`}>
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
