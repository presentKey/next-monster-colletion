import { service } from '@/service/pickService';
import SearchBarContent from './SearchBarContent';
import { Suspense } from 'react';

export default async function MobileSearchBar() {
  const monsters = await service.search.getMonsters();

  return (
    <Suspense>
      <SearchBarContent monsters={monsters} />
    </Suspense>
  );
}
