import { AuthUser, BookmarkList } from '@/model/user';
import { addLocalBookmark, deleteLocalBookmark } from './nonmember';
import { Monster } from '@/model/monster';

type User = AuthUser | undefined;

export async function getBookmarkList(user: User): Promise<BookmarkList> {
  if (!user) {
    // 비회원
    return JSON.parse(localStorage.getItem('bookmark') as string);
  } else {
    // 회원
    const response = await fetch('/api/bookmark');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '서버 요청 실패');
    }

    return data;
  }
}

export async function updateBookmark(
  monsterId: string,
  localBookmarks: Monster[],
  user: User,
  saved: boolean
) {
  if (!user) {
    // 비회원
    return saved
      ? deleteLocalBookmark(monsterId, localBookmarks)
      : addLocalBookmark(monsterId, localBookmarks);
  } else {
    // 회원
    const response = await fetch('/api/bookmark', {
      method: 'PUT',
      body: JSON.stringify({ monsterId, saved }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || '서버 요청 실패');
    }
  }
}
