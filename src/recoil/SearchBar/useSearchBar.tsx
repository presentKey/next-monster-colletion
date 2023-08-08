import { useRecoilState } from 'recoil';
import { searchBar } from './atoms';

export default function useSearchBar() {
  const [open, setOpen] = useRecoilState(searchBar);
  const toggleSearchBar = () => setOpen(!open);

  return { open, toggleSearchBar };
}
