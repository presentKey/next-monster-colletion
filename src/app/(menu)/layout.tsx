import SideCategoryNav from '@/components/layout/SideCategoryNav';
import { service } from '@/service/pickService';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export default async function CategoryLayout({ children }: Props) {
  const categories = await service.category.getAllMainCategory();

  return (
    <div className={styles.container}>
      <SideCategoryNav categories={categories} />
      <section className={styles.detail}>{children}</section>
    </div>
  );
}
