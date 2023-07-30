import { EliteMonster } from '@/model/monster';
import { readFile } from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export default class DevElite {
  constructor() {}

  getElite = cache(async (): Promise<EliteMonster[]> => {
    const filePath = path.join(process.cwd(), 'mock', 'elite.json');

    return readFile(filePath, 'utf-8') //
      .then(JSON.parse);
  });
}
