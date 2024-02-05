import SearchFormWithList from '@/components/common/Search/SearchFormWithList';
import { service } from '@/service/pickService';

export default async function SearchSection() {
  const monsters = await service.search.getMonsters();

  return (
    <section>
      <SearchFormWithList monsters={monsters} smHidden={false} />
    </section>
  );
}
