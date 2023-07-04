import CategoryCard from '../../CategoryCard';
import styles from './css/HomeCategory.module.css';
import { service } from '@/service/pickService';

export default async function HomeCategory() {
  const categories = await service.category.getAllMainCategory();

  return (
    <section className={styles.container}>
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
