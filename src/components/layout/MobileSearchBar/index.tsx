import { service } from '@/service/pickService';
import SearchBarContent from './SearchBarContent';

export default async function MobileSearchBar() {
  const monsters = await service.search.getMonsters();

  return <SearchBarContent monsters={monsters} />;
}
