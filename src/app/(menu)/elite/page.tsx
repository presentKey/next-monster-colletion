import { service } from '@/service/pickService';
import styles from './page.module.css';
import EliteMonsterCardList from '@/components/ElitePage/EliteMonsterCardList/EliteMonsterCardList';
import DragAndDropProvider from '@/components/common/DragAndDrop/DragAndDropProvider';

export default async function ElitePage() {
  const defaultElite = await service.elite.getDefaultElite();

  return (
    <div className={styles.container}>
      <DragAndDropProvider>
        <EliteMonsterCardList defaultElite={defaultElite} />
      </DragAndDropProvider>
    </div>
  );
}
