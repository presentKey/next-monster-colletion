'use client';
import { MainCategory } from '@/model/category';
import CategoryCard from '../../common/CategoryCard';
import styles from './css/index.module.css';
import ArrowBarIcon from '../../common/icons/ArrowBarIcon';
import useSideCategoryNav from '@/recoil/SideCategoryNav/useSideCategoryNav';
import Tooltip from '@/components/common/Tooltip';

type Props = {
  categories: MainCategory[];
};

export default function SideCategoryNav({ categories }: Props) {
  const [isOpen, handleSideCategoryNavToggle] = useSideCategoryNav();

  return (
    <nav className={`sm-hidden ${styles.nav} ${isOpen && styles['is-open']}`}>
      <button
        type='button'
        className={styles['toggle-button']}
        onClick={handleSideCategoryNavToggle}
        title={isOpen ? '카테고리 접기' : '카테고리 열기'}
      >
        <ArrowBarIcon />
      </button>

      <ol className={styles.list}>
        {categories.map((category) => (
          <li className={styles.item} key={category.path}>
            <CategoryCard
              category={category}
              imgSize='small'
              isTitleVisible={isOpen}
              data-tooltip-id='category-tooltip'
              data-tooltip-content={category.title}
            />
          </li>
        ))}

        <Tooltip
          id='category-tooltip'
          hidden={isOpen}
          place='right'
          positionStrategy='fixed'
        />
      </ol>
    </nav>
  );
}
