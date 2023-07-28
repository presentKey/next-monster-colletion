import { service } from '@/service/pickService';
import { Suspense } from 'react';
import SearchBarcontent from './SearchBarcontent';

export default async function SearchBar() {
  const monsters = await service.search.getMonsters();

  return (
    <Suspense fallback={<></>}>
      <SearchBarcontent monsters={monsters} />
    </Suspense>
  );
}
