import { client } from './sanity';

export async function addMember(uid: string) {
  return client.createIfNotExists({
    _id: uid,
    _type: 'user',
    uid,
    bookmarks: [],
    eliteCollections: [],
  });
}

export async function addNonMember(uid: string) {
  return client.createIfNotExists({
    _id: uid,
    _type: 'nonmember',
    uid,
    bookmarks: [],
    eliteCollections: [],
  });
}

export async function findNonmember(uid: string) {
  return client.fetch(
    `*[_type == 'nonmember' && uid == '${uid}'][0]{
        uid
    }`
  );
}

export async function getBookmark(
  uid: string,
  isNonmember: boolean | undefined
) {
  return client.fetch(
    `*[_type == '${isNonmember ? 'nonmember' : 'user'}' && uid == '${uid}'][0]{
        bookmarks[] -> {'id': _id}
    }`
  );
}

export async function addBookmark(monsterId: string, uid: string) {
  return client
    .patch(uid) //
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [{ _ref: monsterId, _type: 'reference' }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function deleteBookmark(monsterId: string, uid: string) {
  return client
    .patch(uid) //
    .unset([`bookmarks[_ref == "${monsterId}"]`])
    .commit();
}

export async function getBookmarkDetail(
  uid: string,
  isNonmember: boolean | undefined
) {
  return client.fetch(
    `*[_type == '${isNonmember ? 'nonmember' : 'user'}' && uid == "${uid}"][0]{
        bookmarks[] -> {
          "id": _id,
          "monsters": {
            "id": _id,
            name,
          },
          information[] -> {registers}
        }
    }`
  );
}
