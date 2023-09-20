import { service } from '@/service/pickService';
import SubCategoryTab from '@/components/layout/SubCategoryTab/SubCategoryTab';
import RegisterByCategory from '@/components/CategoryPage/RegisterByCategory/RegisterByCategory';
import { Metadata } from 'next';

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await service.category.getAllMainCategory();
  const category = categories.find((category) => category.path === params.slug);

  return {
    title: `${category?.title}`,
    description: `${category?.title}의 몬컬 정보`,
  };
}
