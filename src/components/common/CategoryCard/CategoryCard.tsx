'use client';
import { MainCategory } from '@/model/category';
import Image from 'next/image';
import Link from 'next/link';
import styles from './css/CategoryCard.module.css';
import useActiveTab from '@/recoil/SubCategoryTab/useActiveTab';
import { usePathname } from 'next/navigation';

type Props = {
  category: MainCategory;
  imgSize?: 'small' | 'normal';
  isTitleVisible?: boolean;
  onToggleSideBar?: () => void;
};

export default function CategoryCard({
  category: { title, path },
  imgSize = 'normal',
  isTitleVisible = true,
  onToggleSideBar,
}: Props) {
  const pathname = usePathname();
  const { handleActiveTab } = useActiveTab();
  const handleClick = () => {
    setTimeout(() => handleActiveTab(0), 500);
    onToggleSideBar && onToggleSideBar();
  };

  return (
    <Link
      className={`${styles.card}  ${
        pathname.split('/')[2] === path && styles['is-active']
      }`}
      href={`/category/${path}`}
      prefetch={false}
      onClick={handleClick}
      title={title}
    >
      <div className={styles.img}>
        <Image
          className={styles.front}
          src={`/images/category/icon/${path}.png`}
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

      <span
        className={`${styles.title} ${
          !isTitleVisible && styles['title-hidden']
        }`}
      >
        {title}
      </span>
    </Link>
  );
}
