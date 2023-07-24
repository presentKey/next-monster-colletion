'use client';
import { SubCategory } from '@/model/category';
import styles from './css/SubCategoryTab.module.css';
import { useRecoilValue } from 'recoil';
import { timerListLength } from '@/recoil/TimerBar/selectors';

type Props = {
  subCategories: SubCategory[];
};

export default function SubCategoryTab({ subCategories }: Props) {
  const timerLength = useRecoilValue(timerListLength);

  return (
    <aside
      className={`${styles.tab} ${timerLength > 0 && styles['timerbar-open']}`}
    >
      <ul className={styles.list}>
        {subCategories.map(({ title }, index) => (
          <li
            className={`${styles.item} ${index === 0 && styles['is-active']}`}
            key={title}
          >
            {title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
