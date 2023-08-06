import { atom } from 'recoil';

export type TabPanelPositionStorage = {
  [key: string]: number;
};

export const tabId = atom({
  key: 'tabId',
  default: '',
});

export const activeTab = atom({
  key: 'activeTab',
  default: 0,
});

export const tabPanelPositionStorage = atom<TabPanelPositionStorage | {}>({
  key: 'tabPanelPositionStorage',
  default: {},
});
