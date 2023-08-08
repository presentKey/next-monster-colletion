import { Timer } from '@/model/information';
import { atom } from 'recoil';

export const timerBar = atom({
  key: 'timerBar',
  default: false,
});

export const timerList = atom({
  key: 'timerList',
  default: [] as Timer[],
});
