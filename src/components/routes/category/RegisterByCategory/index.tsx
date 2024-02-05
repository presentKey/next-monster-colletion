import { CategoryDetailInformation } from '@/model/category';
import InformationGroup from './InformationGroup';
import TabPanel from '@/components/common/TapPanel/TapPanel';
import styles from './css/index.module.css';
import Notice from '@/components/common/Notice/Notice';

const TIP_TEXT = [
  '프렌즈스토리 구관, 신관 몬스터 레벨은 플레이어의 레벨과 동일(최소 100레벨)',
  '프렌즈스토리 챕터 6 클리어 시, 구관 입장 가능',
  '구관: 일반 스테이지 4 + 보스 스테이지 1',
  '구관: 일반 스테이지 5개 중, 임의로 선정된 4개의 교실을 차례대로 플레이',
];

type Props = {
  detail: CategoryDetailInformation;
  path: string;
};

export default function RegisterByCategory({ detail, path }: Props) {
  return (
    <div className={styles.container}>
      {path === 'friends' && (
        <Notice type='tip' textList={TIP_TEXT} margin='1rem' />
      )}
      {detail.subCategory.map((sub) => (
        <article key={sub.title}>
          <TabPanel title={sub.title} />
          <InformationGroup information={sub.information} />
        </article>
      ))}
    </div>
  );
}
