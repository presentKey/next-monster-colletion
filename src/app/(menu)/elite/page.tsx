import { service } from '@/service/pickService';
import styles from './page.module.css';
import EliteList from '@/components/routes/elite/EliteList';
import DragAndDropProvider from '@/context/DragAndDrop/DragAndDropProvider';
import Notice from '@/components/common/Notice';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '엘몬 컬렉션',
  description: '엘리트 몬스터 컬렉션',
};

const NOTE_TEXT = [`컬렉션 변경이 끝나면 '컬렉션 저장' 버튼을 눌러주세요.`];
const TIP_TEXT = [
  '카드 변경 버튼을 통해 등록 여부 및 카드 위치를 변경할 수 있습니다.',
  '몬스터 카드를 클릭하여 등록/미등록 여부를 관리할 수 있습니다.',
  '몬스터 카드를 드래그하여 위치를 변경할 수 있습니다.',
];

export default async function ElitePage() {
  const defaultList = await service.elite.getDefaultElite();

  return (
    <div className={styles.container}>
      <Notice type='note' textList={NOTE_TEXT} margin='1rem' />
      <Notice type='tip' textList={TIP_TEXT} />
      <DragAndDropProvider>
        <EliteList defaultList={defaultList} />
      </DragAndDropProvider>
    </div>
  );
}
