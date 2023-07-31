import { myEliteCollections } from '@/model/monster';

export async function getUserEliteCollections(): Promise<myEliteCollections | null> {
  const response = await fetch('/api/elite');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }

  return data;
}
