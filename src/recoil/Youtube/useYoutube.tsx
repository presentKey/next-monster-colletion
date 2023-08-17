import { useRecoilState } from 'recoil';
import { youtube } from './atoms';

export default function useYoutube() {
  const [youtubeToggle, setYoutubeToggle] = useRecoilState(youtube);
  const handleYoutubeToggle = () => {
    const now = new Date();
    const uid = `${now.getSeconds()}${now.getMilliseconds()}`;
    setYoutubeToggle(uid);
  };

  return { youtubeToggle, handleYoutubeToggle };
}
