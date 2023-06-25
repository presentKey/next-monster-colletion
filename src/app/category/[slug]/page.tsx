import { service } from '@/service/pickService';
import styles from './page.module.css';

type Props = {
  params: {
    slug: string;
  };
};

export default async function CategoryDetailPage({ params }: Props) {
  const detail = await service.category.getCategoryDetailInfo(params.slug);

  return (
    <>
      <article className={styles.information}>
        {detail.subCategory.map((sub) => sub.title)}
      </article>
      <aside className={styles.tab}>카테고리 디테일 tab</aside>
    </>
  );
}
