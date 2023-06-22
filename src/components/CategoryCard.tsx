import { MainCategory } from '@/model/category';
import Image from 'next/image';
import Link from 'next/link';
import styles from './css/CategoryCard.module.css';

type Props = {
  category: MainCategory;
  direction?: 'row' | 'column';
};

export default function CategoryCard({
  category: { title, path },
  direction = 'column',
}: Props) {
  return (
    <Link
      className={`${styles.card} ${direction === 'row' && styles.row}`}
      href={`/${path}`}
    >
      <div className={styles.img}>
        <Image
          className={styles.front}
          src={`/images/category/${path}.png`}
          alt={`${title} 카테고리`}
          width={34}
          height={34}
        />
        <Image
          className={styles.back}
          src='/images/momong.png'
          alt='모몽 이미지'
          width={34}
          height={34}
        />
      </div>
      <span className={styles.title}>{title}</span>
    </Link>
  );
}
