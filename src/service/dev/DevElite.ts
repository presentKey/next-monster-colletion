import { EliteCollections } from '@/model/monster';
import { readFile } from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export default class DevElite {
  constructor() {}

  getDefaultElite = cache(async (): Promise<EliteCollections[]> => {
    const filePath = path.join(process.cwd(), 'mock', 'elite.json');

    return readFile(filePath, 'utf-8') //
      .then(JSON.parse);
  });
}
