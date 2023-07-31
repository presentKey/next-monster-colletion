export type Monster = {
  id: string;
  name: string;
};

export type SearchMonster = {
  name: string;
  path: string;
};

export type EliteMonster = {
  id: string;
  name: string;
  modifier: {
    first: string;
    second?: string;
  };
};

export type DefaultEliteCollections = {
  elite: EliteMonster;
};

export type myEliteCollections = {
  eliteCollections: {
    elite: EliteMonster;
    isRegister: boolean;
    key: string;
  }[];
};
