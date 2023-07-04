import { MainCategory } from '@/model/category';
import Image from 'next/image';
import Link from 'next/link';
import styles from './css/CategoryCard.module.css';

type Props = {
  category: MainCategory;
  param?: string;
  direction?: 'row' | 'column';
  imgSize?: 'small' | 'normal';
};

export default function CategoryCard({
  category: { title, path },
  param,
  direction = 'column',
  imgSize = 'normal',
}: Props) {
  return (
    <Link
      className={`${styles.card} ${direction === 'row' && styles.row} ${
        param === path && styles['is-active']
      }`}
      href={`/category/${path}`}
      prefetch={false}
    >
      <div className={styles.img}>
        <Image
          className={styles.front}
          src={`/images/category/${path}.png`}
          alt={`${title} 카테고리`}
          width={imgSize === 'small' ? 28 : 34}
          height={imgSize === 'small' ? 28 : 34}
        />
        <Image
          className={styles.back}
          src='/images/momong.png'
          alt='모몽 이미지'
          width={imgSize === 'small' ? 28 : 34}
          height={imgSize === 'small' ? 28 : 34}
        />
      </div>
      <span className={`${styles.title}`}>{title}</span>
    </Link>
  );
}
