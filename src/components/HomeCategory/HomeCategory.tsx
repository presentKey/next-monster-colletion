import { getAllMainCategory } from '@/service/category';
import CategoryCard from './CategoryCard';
import styles from './css/HomeCategory.module.css';

export default async function HomeCategory() {
  const categories = await getAllMainCategory();

  return (
    <section className={styles.category}>
      <ol className={styles.list}>
        {categories.map((category) => (
          <li className={styles.item} key={category.path}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ol>
    </section>
  );
}
