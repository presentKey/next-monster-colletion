'use client';
import ThemeButton from '../../common/ThemeButton/ThemeButton';
import CloseIcon from '../../common/icons/CloseIcon';
import styles from './css/SideBarContent.module.css';
import useSideBar from '@/recoil/SideBar/useSideBar';
import { MainCategory } from '@/model/category';
import CategoryCard from '../../common/CategoryCard/CategoryCard';
import { useParams } from 'next/navigation';
import BackgroundOverlay from '@/components/common/BackgroundOverlay/BackgroundOverlay';

type Props = {
  categories: MainCategory[];
};

export default function SideBarContent({ categories }: Props) {
  const { open, toggleSideBar } = useSideBar();
  const { slug } = useParams();

  return (
    <>
      <aside
        className={`sm-only ${styles.sidebar} ${open && styles['is-open']}`}
      >
        <button className={styles.close} type='button' onClick={toggleSideBar}>
          <CloseIcon />
        </button>
        <div className={styles.theme}>
          <span>화면 테마 설정</span>
          <ThemeButton />
        </div>
        <ol className={styles.list}>
          {categories.map((category) => (
            <li className={styles.item} key={category.path}>
              <CategoryCard category={category} param={slug} direction='row' />
            </li>
          ))}
        </ol>
      </aside>
      {open && <BackgroundOverlay onClose={toggleSideBar} />}
    </>
  );
}
