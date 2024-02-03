import { MainCategory } from '@/model/category';
import Image from 'next/image';
import Link from 'next/link';
import styles from './css/HomeCategoryCard.module.css';

type Props = {
  category: MainCategory;
};

export default function HomeCategoryCard({ category: { title, path } }: Props) {
  return (
    <li className={styles.card}>
      <Link href={`/category/${path}`} prefetch={false}>
        <div className={styles.container}>
          <Image
            className={styles['bg-image']}
            src={`/images/category/bg/${path}.png`}
            alt={`${title} 배경 이미지`}
            fill={true}
            sizes='150px'
          />
          <div className={styles.icon}>
            <Image
              className={styles['icon-image']}
              src={`/images/category/icon/${path}.png`}
              alt={`${title} 아이콘`}
              width={34}
              height={34}
            />
          </div>
          <div className={styles.title}>
            <h4 className={styles.region}>{title}</h4>
          </div>
        </div>
      </Link>
    </li>
  );
}
