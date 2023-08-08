import { CategoryDetailInformation, MainCategory } from '@/model/category';
import { SearchMonster } from '@/model/monster';
import { readFile } from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export default class DevSearch {
  constructor() {}

  getMonsters = cache(async (): Promise<SearchMonster[]> => {
    const filePath = path.join(process.cwd(), 'mock', 'search.json');

    return readFile(filePath, 'utf-8') //
      .then(JSON.parse);
  });
}
