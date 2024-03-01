import Category from './query/category';
import Elite from './query/elite';
import Search from './query/search';

export default class Service {
  constructor() {}

  category = new Category();
  search = new Search();
  elite = new Elite();
}
