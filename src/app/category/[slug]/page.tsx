import { service } from '@/service/pickService';
import SubCategoryTab from '@/components/SubCategoryTab';
import RegisterByCategory from '@/components/RegisterByCategory/RegisterByCategory';

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
      <RegisterByCategory detail={detail} />
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
