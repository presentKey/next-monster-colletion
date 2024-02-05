import HomeCategoryCard from './HomeCategoryCard';
import styles from './css/index.module.css';
import { service } from '@/service/pickService';

export default async function CategorySection() {
  const categories = await service.category.getAllMainCategory();

  return (
    <section className={styles.container}>
      <ol className={styles.list}>
        {categories.map((category) => (
          <HomeCategoryCard key={category.path} category={category} />
        ))}
      </ol>
    </section>
  );
}
