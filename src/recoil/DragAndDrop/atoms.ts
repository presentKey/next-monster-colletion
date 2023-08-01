import { atom } from 'recoil';

export const eliteDestination = atom<number | null>({
  key: 'eliteDestination',
  default: null,
});
