import { BookmarkList, SavedBookmarkInfo } from '@/model/user';

export async function getBookmarkList(): Promise<BookmarkList> {
  const response = await fetch('/api/bookmark');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }

  return data;
}

export async function updateBookmark(monsterId: string, saved: boolean) {
  const response = await fetch('/api/bookmark', {
    method: 'PUT',
    body: JSON.stringify({ monsterId, saved }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }
}

export async function getSavedBookmarkInfo(): Promise<SavedBookmarkInfo> {
  const response = await fetch('/api/bookmark/my');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }

  return data;
}

export async function resetBookmark() {
  const response = await fetch('/api/bookmark/reset', {
    method: 'PUT',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '서버 요청 실패');
  }
}
