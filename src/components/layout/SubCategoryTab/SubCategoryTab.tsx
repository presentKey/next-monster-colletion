'use client';
import { SubCategory } from '@/model/category';
import styles from './css/SubCategoryTab.module.css';
import useTabScroll from '@/recoil/SubCategoryTab/useTabScroll';
import useActiveTab from '@/recoil/SubCategoryTab/useActiveTab';

type Props = {
  subCategories: SubCategory[];
};

export default function SubCategoryTab({ subCategories }: Props) {
  const { getTabLablledby } = useTabScroll();
  const { active, handleActiveTab } = useActiveTab();
  const handleScrollTabClick = (e: React.MouseEvent, index: number) => {
    handleActiveTab(index);
    getTabLablledby(e);
  };

  return (
    <aside className={styles.tab}>
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
