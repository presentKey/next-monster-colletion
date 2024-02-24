import { useRecoilState } from 'recoil';
import { eliteDestination } from './atoms';

export default function useDndPreviewLine() {
  const [previewLine, setPreviewLine] = useRecoilState(eliteDestination);
  const handlePreviewLine = (hoverIndex: number) => setPreviewLine(hoverIndex);
  const resetPreviewLine = () => setPreviewLine(null);

  return { previewLine, handlePreviewLine, resetPreviewLine };
}
