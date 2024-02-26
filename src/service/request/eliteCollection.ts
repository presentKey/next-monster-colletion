import { EliteCollections } from '@/model/monster';
import { AuthUser, UserEliteCollections } from '@/model/user';

export async function getUserEliteCollections(
  user: AuthUser | undefined,
  defaultList: EliteCollections[]
): Promise<EliteCollections[] | null> {
  if (!user) return null;

  const response = await fetch('/api/elite');
  const data = await response.json();

  if (!data.eliteCollections) return null;
  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }

  // EliteCollections[] model type으로 반환되도록
  // 서버에 저장된 엘리트 몬스터 등록 여부 데이터를 가공
  const myList = JSON.parse(data.eliteCollections).map(
    ({ name, isRegistred }: UserEliteCollections) => {
      const target = defaultList.find((item) => item.elite.name === name);

      return {
        elite: { ...target?.elite, isRegistred },
      };
    }
  ) as EliteCollections[];

  // 새로 추가된 엘리트 몬스터가 있는 경우 리스트에 반영
  if (myList.length < defaultList.length) {
    for (let i = myList.length; i <= defaultList.length - 1; i++) {
      const newMonster = defaultList[i];
      myList.push({
        elite: { ...newMonster.elite, isRegistred: false },
      });
    }
  }

  return myList;
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
