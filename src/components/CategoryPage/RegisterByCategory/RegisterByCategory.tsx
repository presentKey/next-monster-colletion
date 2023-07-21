import { CategoryDetailInformation } from '@/model/category';
import styles from './css/RegisterByCategory.module.css';
import InformationGroup from '../InformationGroup/InformationGroup';
import Headline from '@/components/common/Headline/Headline';

type Props = {
  detail: CategoryDetailInformation;
};

export default function RegisterByCategory({ detail }: Props) {
  return (
    <div className={styles.container}>
      {detail.subCategory.map((sub) => (
        <article className={styles.information} key={sub.title}>
          <Headline title={sub.title} />
          <InformationGroup information={sub.information} />
        </article>
      ))}
    </div>
  );
}
