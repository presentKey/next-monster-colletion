import { SubCategory } from '@/model/category';
import styles from './css/SubCategoryTab.module.css';

type Props = {
  subCategories: SubCategory[];
};

export default function SubCategoryTab({ subCategories }: Props) {
  return (
    <aside className={styles.tab}>
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
