'use client';
import { SubCategory } from '@/model/category';
import styles from './css/SubCategoryTab.module.css';
import { useRecoilValue } from 'recoil';
import { timerListLength } from '@/recoil/TimerBar/selectors';
import { useState } from 'react';

type Props = {
  subCategories: SubCategory[];
};

export default function SubCategoryTab({ subCategories }: Props) {
  const [active, setActive] = useState(0);
  const timerLength = useRecoilValue(timerListLength);
  const handleActiveTabClick = (index: number) => setActive(index);

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
            onClick={() => handleActiveTabClick(index)}
          >
            {title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
