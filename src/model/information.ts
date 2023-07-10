import { Monster } from './monster';

export type Register = {
  tag: {
    id: LabelTag;
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

/**
 * @desc: N(일반) | Q(퀘스트) | PQ(파티퀘스트)
 * @desc: B(보스) | O(기타) | TD(테마던전) | M(몬스터파크)
 * */
export type LabelTag = 'PQ' | 'B' | 'O' | 'TD' | 'M';

export type RegisterInfoByCategory = {
  registers: Register[];
  monsters: Monster[];
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
