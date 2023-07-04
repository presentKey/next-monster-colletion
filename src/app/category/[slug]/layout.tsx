import SideNav from '@/components/layout/SideNav/SideNav';
import { service } from '@/service/pickService';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export default async function CategoryLayout({ children, params }: Props) {
  const categories = await service.category.getAllMainCategory();

  return (
    <div className={styles.container}>
      <SideNav categories={categories} param={params.slug} />
      <section className={styles.detail}>{children}</section>
    </div>
  );
}
