import { RegisterInfoByCategory, Register } from './information';

export type MainCategory = {
  title: string;
  path: string;
};

export type SubCategory = {
  title: string;
  information: RegisterInfoByCategory[];
};

export type CategoryDetailInformation = {
  path: string;
  subCategory: SubCategory[];
};
