import DevCategory from './DevCategory';
import DevSearch from './DevSearch';

export default class DevService {
  constructor() {}

  category = new DevCategory();
  search = new DevSearch();
}
