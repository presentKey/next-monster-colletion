import { Monster } from '@/model/monster';

export async function addLocalBookmark(
  monsterId: string,
  bookmarks: Monster[]
) {
  localStorage.setItem(
    'bookmark',
    JSON.stringify({
      bookmarks: [...bookmarks, { id: monsterId }],
    })
  );
}
export async function deleteLocalBookmark(
  monsterId: string,
  bookmarks: Monster[]
) {
  localStorage.setItem(
    'bookmark',
    JSON.stringify({
      bookmarks: bookmarks.filter((item) => item.id !== monsterId),
    })
  );
}
