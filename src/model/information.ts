import { MonsterName } from './monster';

export type Register = {
  tag: string;
  _key: string;
  job: string;
  description: string;
};

export type RegisterInfoByCategory = {
  registers: Register[];
  monsters: MonsterName[];
};
