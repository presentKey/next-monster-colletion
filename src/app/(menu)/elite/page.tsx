import MonsterCardList from '@/components/common/MonsterCardList/MonsterCardList';
import { service } from '@/service/pickService';

export default async function ElitePage() {
  const eliteMonsters = await service.elite.getElite();

  return (
    <div>
      <MonsterCardList monsters={eliteMonsters} type='elite' />
    </div>
  );
}
