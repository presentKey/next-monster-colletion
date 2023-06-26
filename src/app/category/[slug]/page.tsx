import { service } from '@/service/pickService';
import SubCategoryTab from '@/components/SubCategoryTab';
import RegisterByCategory from '@/components/RegisterByCategory';

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
