export default class BookmarkService {
  constructor() {}

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
