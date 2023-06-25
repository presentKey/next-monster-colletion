import { MainCategory } from '@/model/category';
import CategoryCard from './CategoryCard';
import styles from './css/SideNav.module.css';

type Props = {
  categories: MainCategory[];
  param: string;
};

export default function SideNav({ categories, param }: Props) {
  return (
    <nav className={`sm-hidden ${styles.nav}`}>
      <ol>
        {categories.map((category) => (
          <li className={styles.list} key={category.path}>
            <CategoryCard
              category={category}
              param={param}
              direction='row'
              imgSize='small'
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
