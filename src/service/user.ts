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
