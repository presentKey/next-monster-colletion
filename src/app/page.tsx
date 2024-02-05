import CategorySection from '@/components/routes/home/CategorySection';
import IntroduceSection from '@/components/routes/home/IntroduceSection';
import SearchSection from '@/components/routes/home/SearchSection';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <IntroduceSection />
        <SearchSection />
      </div>
      <CategorySection />
    </>
  );
}
