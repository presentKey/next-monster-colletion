import { MainCategory } from '@/model/category';
import { readFile } from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export default class DevCategory {
  constructor() {}

  getAllMainCategory = cache(async (): Promise<MainCategory[]> => {
    const filePath = path.join(process.cwd(), 'mock', 'mainCategory.json');

    return readFile(filePath, 'utf-8') //
      .then(JSON.parse);
  });
}
