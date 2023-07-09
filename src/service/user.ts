import { client } from './sanity';

export async function addUser(uid: string) {
  return client.createIfNotExists({
    _id: uid,
    _type: 'user',
    uid,
    bookmarks: [],
    eliteCollections: [],
  });
}

export async function getBookmark(uid: string) {
  return client.fetch(
    `*[_type == 'user' && uid == '${uid}'][0]{
        bookmarks
    }`
  );
}
