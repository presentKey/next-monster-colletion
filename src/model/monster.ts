export type Monster = {
  id: string;
  name: string;
  youtube?: string | null;
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
  isRegistred?: boolean;
};

export type EliteCollections = {
  elite: EliteMonster;
};
