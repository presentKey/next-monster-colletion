import { CategoryDetailInformation } from '@/model/category';
import SubCategoryGroup from './SubCategoryGroup';
import TOCHeading from '@/components/routes/category/InformationByCategory/TOCHeading';
import styles from './css/index.module.css';
import Notice from '@/components/common/Notice';

const TIP_TEXT = [
  '프렌즈스토리 구관, 신관 몬스터 레벨은 플레이어의 레벨과 동일(최소 100레벨)',
  '프렌즈스토리 챕터 6 클리어 시, 구관 입장 가능',
  '구관: 일반 스테이지 4 + 보스 스테이지 1',
  '구관: 일반 스테이지 5개 중, 임의로 선정된 4개의 교실을 차례대로 플레이',
];

type Props = {
  detailInfo: CategoryDetailInformation;
  path: string;
};

export default function InformationByCategory({ detailInfo, path }: Props) {
  return (
    <div className={styles.container}>
      {path === 'friends' && (
        <Notice type='tip' textList={TIP_TEXT} margin='1rem' />
      )}

      {detailInfo.subCategory.map((sub, index) => (
        <article key={sub.title}>
          <TOCHeading title={sub.title} index={index} />
          <SubCategoryGroup information={sub.information} />
        </article>
      ))}
    </div>
  );
}
