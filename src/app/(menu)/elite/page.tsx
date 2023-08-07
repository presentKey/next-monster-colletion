import { service } from '@/service/pickService';
import styles from './page.module.css';
import EliteMonsterCardList from '@/components/ElitePage/EliteMonsterCardList/EliteMonsterCardList';
import DragAndDropProvider from '@/components/common/DragAndDrop/DragAndDropProvider';
import Notice from '@/components/common/Notice/Notice';

const NOTE_TEXT = [`컬렉션 변경이 끝나면 '엘몬 저장' 버튼을 눌러주세요.`];
const TIP_TEXT = [
  '등록/미등록 엘리트 몬스터를 관리할 수 있습니다.',
  '몬스터 카드를 드래그하여 위치를 변경할 수 있습니다.',
];

export default async function ElitePage() {
  const defaultElite = await service.elite.getDefaultElite();

  return (
    <div className={styles.container}>
      <Notice type='note' textList={NOTE_TEXT} />
      <Notice type='tip' textList={TIP_TEXT} />
      <DragAndDropProvider>
        <EliteMonsterCardList defaultElite={defaultElite} />
      </DragAndDropProvider>
    </div>
  );
}
