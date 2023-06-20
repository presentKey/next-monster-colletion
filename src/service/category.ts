import { MainCategory } from '@/model/category';
import { client } from './sanity';

export async function getAllMainCategory(): Promise<MainCategory[]> {
  return client //
    .fetch(
      `*[_type == 'category'] | order(order asc){
            title,
            path,
        }`
    );
}
