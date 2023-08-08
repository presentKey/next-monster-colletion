import { client } from './sanity';
import { cache } from 'react';
import { SearchMonster } from '@/model/monster';

export default class Search {
  constructor() {}

  getMonsters = cache(async (): Promise<SearchMonster[]> => {
    return client //
      .fetch(
        `*[_type == 'monster'] | order(name asc){
            name,
            path,
        }`
      );
  });
}
