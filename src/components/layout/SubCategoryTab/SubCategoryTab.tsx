'use client';
import { SubCategory } from '@/model/category';
import styles from './css/SubCategoryTab.module.css';
import { useRecoilValue } from 'recoil';
import { timerListLength } from '@/recoil/TimerBar/selectors';
import { useState } from 'react';
import useTabScroll from '@/recoil/SubCategoryTab/useTabScroll';

type Props = {
  subCategories: SubCategory[];
};

export default function SubCategoryTab({ subCategories }: Props) {
  const [active, setActive] = useState(0);
  const timerLength = useRecoilValue(timerListLength);
  const { getTabLablledby } = useTabScroll();
  const handleScrollTabClick = (e: React.MouseEvent, index: number) => {
    setActive(index);
    getTabLablledby(e);
  };

  return (
    <aside
      className={`${styles.tab} ${timerLength > 0 && styles['timerbar-open']}`}
    >
      <ul className={styles.list}>
        {subCategories.map(({ title }, index) => (
          <li
            className={`${styles.item} ${
              index === active && styles['is-active']
            }`}
            key={title}
            role='tab'
            aria-labelledby={title}
            onClick={(e: React.MouseEvent) => handleScrollTabClick(e, index)}
          >
            {title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
