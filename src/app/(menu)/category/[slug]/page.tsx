import { service } from '@/service/pickService';
import SubCategoryTab from '@/components/layout/SubCategoryTab/SubCategoryTab';
import RegisterByCategory from '@/components/CategoryPage/RegisterByCategory/RegisterByCategory';
import TabScrollEvent from '@/components/CategoryPage/TabScrollEvent/TabScrollEvent';

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
      <TabScrollEvent />
      <RegisterByCategory detail={detail} path={params.slug} />
      <SubCategoryTab subCategories={subCategories} />
    </>
  );
}

export async function generateStaticParams() {
  const categories = await service.category.getAllMainCategory();
  return categories.map((category) => ({
    slug: category.path,
  }));
}
