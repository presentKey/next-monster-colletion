import { CategoryDetailInformation } from '@/model/category';
import styles from './css/RegisterByCategory.module.css';
import { dohyeon } from '@/utils/fonts';
import InformationGroup from '../InformationGroup/InformationGroup';

type Props = {
  detail: CategoryDetailInformation;
};

export default function RegisterByCategory({ detail }: Props) {
  return (
    <div className={styles.container}>
      {detail.subCategory.map((sub) => (
        <article className={styles.information} key={sub.title}>
          <h2 className={`${styles.title} ${dohyeon.className}`}>
            <span>{sub.title}</span>
          </h2>
          <InformationGroup information={sub.information} />
        </article>
      ))}
    </div>
  );
}
