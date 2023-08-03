import { EliteCollections } from '@/model/monster';
import { AuthUser, UserEliteCollections } from '@/model/user';

export async function getUserEliteCollections(
  user: AuthUser | undefined,
  defaultElite: EliteCollections[]
): Promise<EliteCollections[]> {
  if (!user) return defaultElite;

  const response = await fetch('/api/elite');
  const data = await response.json();

  if (!data.eliteCollections) return defaultElite;
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
  );

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
