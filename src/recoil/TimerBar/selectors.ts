import { selector } from 'recoil';
import { timerList } from './atoms';

export const timerListLength = selector({
  key: 'timerListLength',
  get: ({ get }) => get(timerList).length,
});
