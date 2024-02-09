'use client';
import ThemeButton from '../../common/ThemeButton/ThemeButton';
import styles from './css/MobileSideMenuContent.module.css';
import useMobileSideMenu from '@/recoil/MobileSideMenu/useMobileSideMenu';
import { MainCategory } from '@/model/category';
import CategoryCard from '../../common/CategoryCard/CategoryCard';
import BackgroundOverlay from '@/components/common/BackgroundOverlay/BackgroundOverlay';
import CloseButton from '@/components/common/CloseButton/CloseButton';

type Props = {
  categories: MainCategory[];
};

export default function MobileSideMenuContent({ categories }: Props) {
  const { open, toggleSideBar } = useMobileSideMenu();

  return (
    <>
      <aside
        className={`sm-only ${styles.sidebar} ${open && styles['is-open']}`}
      >
        <CloseButton onClick={toggleSideBar} />

        <div className={styles.theme}>
          <span>화면 테마 설정</span>
          <ThemeButton />
        </div>
        <ol className={styles.list}>
          {categories.map((category) => (
            <li className={styles.item} key={category.path}>
              <CategoryCard
                category={category}
                onToggleSideBar={toggleSideBar}
              />
            </li>
          ))}
        </ol>
      </aside>
      {open && <BackgroundOverlay onClose={toggleSideBar} />}
    </>
  );
}
