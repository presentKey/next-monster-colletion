import { EliteCollections } from '@/model/monster';
import { AuthUser, UserEliteCollections } from '@/model/user';

export async function getUserEliteCollections(
  user: AuthUser | undefined,
  defaultElite: EliteCollections[]
): Promise<EliteCollections[] | null> {
  if (!user) return null;

  const response = await fetch('/api/elite');
  const data = await response.json();

  if (!data.eliteCollections) return null;
  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }

  const eliteList = JSON.parse(data.eliteCollections).map(
    ({ name, isRegistred }: UserEliteCollections) => {
      const target = defaultElite.find((item) => item.elite.name === name);

      return {
        elite: { ...target?.elite, isRegistred },
      };
    }
  ) as EliteCollections[];

  // 새로 추가된 엘리트 몬스터를 목록에 반영
  if (eliteList.length < defaultElite.length) {
    for (let i = eliteList.length; i <= defaultElite.length - 1; i++) {
      const newMonster = defaultElite[i];
      eliteList.push({
        elite: { ...newMonster.elite, isRegistred: false },
      });
    }
  }

  return eliteList;
}

export async function saveEliteCollections(eliteList: EliteCollections[]) {
  const response = await fetch('/api/elite', {
    method: 'PUT',
    body: JSON.stringify({ eliteList }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }
}
