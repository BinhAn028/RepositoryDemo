import { openDB as openIdb } from 'idb';

export async function openDB() {
  return await openIdb('messages-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', { autoIncrement: true });
      }
    },
  });
}