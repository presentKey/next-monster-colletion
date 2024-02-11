import { service } from '@/service/pickService';
import MobileSideMenuContent from './MobileSideMenuContent';

export default async function MobileSideMenu() {
  const categories = await service.category.getAllMainCategory();

  return <MobileSideMenuContent categories={categories} />;
}
