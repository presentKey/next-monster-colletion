export default class BookmarkService {
  constructor() {}

  updateBookmark = (
    name: string,
    saved: boolean,
    setSave: (state: boolean) => void
  ) => {
    const bookmark = JSON.parse(localStorage.getItem('bookmark') as string);

    saved
      ? (this.deleteBookmark(name, bookmark), setSave(false))
      : (this.addBookmark(name, bookmark), setSave(true));
  };

  private deleteBookmark = (name: string, bookmark: string[]) => {
    localStorage.setItem(
      'bookmark',
      JSON.stringify(bookmark.filter((monsterName) => monsterName !== name))
    );
  };

  private addBookmark = (name: string, bookmark: string[]) => {
    localStorage.setItem(
      'bookmark',
      JSON.stringify([...new Set([...bookmark, name])])
    );
  };
}
