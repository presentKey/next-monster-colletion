'use client';
import { MainCategory } from '@/model/category';
import CategoryCard from './CategoryCard';
import styles from './css/SideNav.module.css';
import ArrowBarIcon from './icons/ArrowBarIcon';

type Props = {
  categories: MainCategory[];
  param: string;
};

export default function SideNav({ categories, param }: Props) {
  return (
    <nav className={`sm-hidden ${styles.nav}`}>
      <ol className={styles.list}>
        {categories.map((category) => (
          <li className={styles.item} key={category.path}>
            <CategoryCard
              category={category}
              param={param}
              direction='row'
              imgSize='small'
            />
          </li>
        ))}

        <button className={styles['toggle-button']} type='button'>
          <ArrowBarIcon />
        </button>
      </ol>
    </nav>
  );
}
