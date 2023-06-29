import { MonsterName } from './monster';

export type Register = {
  tag: {
    /**
     * @desc: N(일반) | Q(퀘스트) | PQ(파티퀘스트)
     * @desc: B(보스) | O(기타) | TD(테마던전) | M(몬스터파크)
     * */
    id: 'N' | 'Q' | 'PQ' | 'B' | 'O' | 'TD' | 'M';
    name: 'string';
  };
  job: string;
  isDescriptionsGroup: boolean;
  descriptions: string[];
  quest: Quest[];
  location: Location;
  timer: string;
  boss: Boss;
};

export type RegisterInfoByCategory = {
  registers: Register[];
  monsters: MonsterName[];
};

export type Quest = {
  level: string;
  name: string;
  description: string;
};

export type Location = {
  main: string;
  sub: string;
};

export type Boss = {
  name: string;
  difficulty: string;
  description: string;
};
