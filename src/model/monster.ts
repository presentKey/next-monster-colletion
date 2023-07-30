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
