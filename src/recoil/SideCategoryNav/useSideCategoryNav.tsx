import { useRecoilState } from 'recoil';
import { sideCategoryNav } from './atoms';

export default function useSideCategoryNav(): [boolean, () => void] {
  const [isOpen, setIsOpen] = useRecoilState(sideCategoryNav);
  const handleSideCategoryNavToggle = () => setIsOpen((prev) => !prev);

  return [isOpen, handleSideCategoryNavToggle];
}
