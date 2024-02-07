import { SetterOrUpdater, useRecoilState } from 'recoil';
import { searchText } from './atoms';

export default function useSearchText(): [string, SetterOrUpdater<string>] {
  const [text, setText] = useRecoilState(searchText);

  return [text, setText];
}
