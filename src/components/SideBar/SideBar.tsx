import { getAllMainCategory } from '@/service/category';
import SideBarContent from './SideBarContent';

export default async function SideBar() {
  const categories = await getAllMainCategory();

  return <SideBarContent categories={categories} />;
}
