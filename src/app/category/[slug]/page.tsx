import { service } from '@/service/pickService';
import styles from './page.module.css';
import SubCategoryTab from '@/components/SubCategoryTab';

type Props = {
  params: {
    slug: string;
  };
};

export default async function CategoryDetailPage({ params }: Props) {
  const detail = await service.category.getCategoryDetailInfo(params.slug);
  const subCategories = detail.subCategory.map((sub) => ({ title: sub.title }));

  return (
    <>
      <article className={styles.information}>카테고리 디테일</article>
      <SubCategoryTab subCategories={subCategories} />
    </>
  );
}
