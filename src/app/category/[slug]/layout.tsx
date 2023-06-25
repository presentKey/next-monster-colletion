import SideNav from '@/components/SideNav';
import { service } from '@/service/pickService';
import styles from './layout.module.css';

type Props = {
  children: React.ReactNode;
};

export default async function CategoryLayout({ children }: Props) {
  const categories = await service.category.getAllMainCategory();

  return (
    <div className={styles.container}>
      <SideNav categories={categories} />
      <section className={styles.detail}>{children}</section>
    </div>
  );
}
