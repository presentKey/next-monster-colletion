import { CategoryDetailInformation, MainCategory } from '@/model/category';
import { client } from '../sanity';
import { cache } from 'react';

export default class Category {
  constructor() {}

  getAllMainCategory = cache(async (): Promise<MainCategory[]> => {
    return client //
      .fetch(
        `*[_type == 'category'] | order(order asc){
            title,
            path,
        }`
      );
  });

  getCategoryDetailInfo = cache(
    async (path: string): Promise<CategoryDetailInformation> => {
      return client //
        .fetch(
          `*[_type == 'category' && path == '${path}'][0]{
            path,
            subCategory[]{
              title,
              information[]->{
                registers,
                monsters[]->{
                  'id': _id,
                  name,
                  youtube
                }
              }
            }
          }`
        );
    }
  );
}
