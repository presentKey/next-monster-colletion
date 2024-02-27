import { service } from '@/service/pickService';
import TableOfContents from '@/components/routes/category/layout/TableOfContents';
import RegisterByCategory from '@/components/routes/category/RegisterByCategory';
import { Metadata } from 'next';
import MontserTooltip from '@/components/routes/category/MonsterTooltip';

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
      <MontserTooltip />
      <RegisterByCategory detail={detail} path={params.slug} />
      <TableOfContents subCategories={subCategories} />
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
