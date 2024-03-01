import { useRecoilState } from 'recoil';
import { youtube } from './atoms';

export default function useYoutube() {
  const [youtubeToggle, setYoutubeToggle] = useRecoilState(youtube);

  /**
   * youtube 버튼 클릭 시, 페이지의 높이가 달리지기 때문에
   * TOC active 스크롤 위치를 맞춰주기 위해 TOCHeading 위치 재설정에 필요
   */
  const handleYoutubeToggle = () => {
    const now = new Date();
    const uid = `${now.getSeconds()}${now.getMilliseconds()}`;
    setYoutubeToggle(uid);
  };

  return { youtubeToggle, handleYoutubeToggle };
}
