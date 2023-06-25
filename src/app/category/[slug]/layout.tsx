import SideNav from '@/components/SideNav';
import { service } from '@/service/pickService';

type Props = {
  children: React.ReactNode;
};

export default async function CategoryLayout({ children }: Props) {
  const categories = await service.category.getAllMainCategory();

  return (
    <>
      <SideNav categories={categories} />
      {children}
    </>
  );
}
