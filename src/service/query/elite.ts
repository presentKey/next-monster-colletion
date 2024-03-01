import { client } from '../sanity';
import { cache } from 'react';
import { EliteCollections } from '@/model/monster';

export default class Elite {
  constructor() {}

  getDefaultElite = cache(async (): Promise<EliteCollections[]> => {
    return client //
      .fetch(
        `*[_type == 'eliteMonster'] | order(_createdAt asc) {
          'elite' : {
            'id' : _id,
            name,
            modifier
          }
        }`
      );
  });
}
