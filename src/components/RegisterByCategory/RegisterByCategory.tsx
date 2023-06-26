import { CategoryDetailInformation } from '@/model/category';
import styles from './css/RegisterByCategory.module.css';
import { dohyeon } from '@/utils/fonts';
import InformationGroup from './InformationGroup';

type Props = {
  detail: CategoryDetailInformation;
};

export default function RegisterByCategory({ detail }: Props) {
  return (
    <article className={styles.information}>
      {detail.subCategory.map((sub) => (
        <>
          <h2
            className={`${styles['sub-title']} ${dohyeon.className}`}
            key={sub.title}
          >
            {sub.title}
          </h2>
          <InformationGroup information={sub.information} />
        </>
      ))}
    </article>
  );
}
