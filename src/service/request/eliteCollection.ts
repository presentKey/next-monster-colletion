import { myEliteCollections } from '@/model/monster';
import { AuthUser } from '@/model/user';

export async function getUserEliteCollections(
  user: AuthUser | undefined
): Promise<myEliteCollections | null> {
  if (!user) return null;

  const response = await fetch('/api/elite');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }

  return data;
}
