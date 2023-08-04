import DevCategory from './DevCategory';
import DevElite from './DevElite';
import DevSearch from './DevSearch';

export default class DevService {
  constructor() {}

  category = new DevCategory();
  search = new DevSearch();
  elite = new DevElite();
}
