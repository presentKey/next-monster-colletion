import { MainCategory } from '@/model/category';
import { client } from './sanity';
import { cache } from 'react';

export const getAllMainCategory = cache(async (): Promise<MainCategory[]> => {
  return client //
    .fetch(
      `*[_type == 'category'] | order(order asc){
            title,
            path,
        }`
    );
});
