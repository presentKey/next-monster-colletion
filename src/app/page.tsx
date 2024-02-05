import CategorySection from '@/components/routes/home/CategorySection';
import IntroduceSection from '@/components/routes/home/IntroduceSection';
import SearchSection from '@/components/routes/home/SearchSection';
import styles from './page.module.css';
import { service } from '@/service/pickService';

export default async function HomePage() {
  const monsters = await service.search.getMonsters();

  return (
    <>
      <div className={styles.container}>
        <IntroduceSection monsterNum={monsters.length} />
        <SearchSection monsters={monsters} />
      </div>
      <CategorySection />
    </>
  );
}
