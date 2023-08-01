import { useRecoilState } from 'recoil';
import { eliteDestination } from './atoms';

export default function useEliteDragAndDrop() {
  const [destination, setDestination] = useRecoilState(eliteDestination);
  const handleDestination = (hoverIndex: number) => setDestination(hoverIndex);
  const clearDestination = () => setDestination(null);

  return { destination, handleDestination, clearDestination };
}
