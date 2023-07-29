import { service } from '@/service/pickService';
import SearchBarcontent from './SearchBarcontent';

export default async function SearchBar() {
  const monsters = await service.search.getMonsters();

  return <SearchBarcontent monsters={monsters} />;
}
