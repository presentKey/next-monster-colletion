import { client } from './sanity';
import { cache } from 'react';
import { EliteMonster } from '@/model/monster';

export default class Elite {
  constructor() {}

  getElite = cache(async (): Promise<EliteMonster[]> => {
    return client //
      .fetch(
        `*[_type == 'eliteMonster'] | order(_createdAt asc) {
            'id' : _id,
            name,
            modifier
          }`
      );
  });
}
