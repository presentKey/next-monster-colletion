import { AuthUser } from '@/model/user';

export default class BookmarkService {
  constructor() {}

  getBookmarkList = async (user: AuthUser | undefined): Promise<string[]> => {
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

      return data.bookmarks;
    }
  };

  updateBookmark = async (name: string, saved: boolean) => {
    const bookmark = JSON.parse(localStorage.getItem('bookmark') as string);

    return saved
      ? this.deleteBookmark(name, bookmark)
      : this.addBookmark(name, bookmark);
  };

  private deleteBookmark = async (name: string, bookmark: string[]) => {
    localStorage.setItem(
      'bookmark',
      JSON.stringify(bookmark.filter((monsterName) => monsterName !== name))
    );
  };

  private addBookmark = async (name: string, bookmark: string[]) => {
    localStorage.setItem(
      'bookmark',
      JSON.stringify([...new Set([...bookmark, name])])
    );
  };
}
