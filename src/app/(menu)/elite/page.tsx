import { service } from '@/service/pickService';
import styles from './page.module.css';
import EliteMonsterCardList from '@/components/ElitePage/EliteMonsterCardList/EliteMonsterCardList';

export default async function ElitePage() {
  const defaultElite = await service.elite.getDefaultElite();

  return (
    <div className={styles.container}>
      <EliteMonsterCardList defaultElite={defaultElite} />
    </div>
  );
}
