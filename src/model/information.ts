import { MonsterName } from './monster';

export type Register = {
  tag: string;
  job: string;
  descriptions: string[];
  quest: Quest[];
  location: {
    main: string;
    sub: string;
  };
  timer: string;
  boss: {
    name: string;
    difficulty: string;
    description: string;
  };
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
