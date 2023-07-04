import { service } from '@/service/pickService';
import SideBarContent from './SideBarContent';

export default async function SideBar() {
  const categories = await service.category.getAllMainCategory();

  return <SideBarContent categories={categories} />;
}
