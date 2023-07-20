import { Register } from './information';
import { Monster } from './monster';

export type AuthUser = {
  uid: string;
  nonmember?: boolean;
};

export type BookmarkList = {
  bookmarks: Monster[];
};

export type SavedBookmarkInfo = {
  bookmarks: {
    id: string;
    information: { registers: Register[] }[];
    monsters: Monster;
  }[];
};
