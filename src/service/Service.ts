import Category from './category';
import Elite from './elite';
import Search from './search';

export default class Service {
  constructor() {}

  category = new Category();
  search = new Search();
  elite = new Elite();
}
