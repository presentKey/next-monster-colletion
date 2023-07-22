import { toast } from 'react-toastify';

export function copyLocation(location: string) {
  toast.dismiss();
  window.navigator.clipboard
    .writeText(location) //
    .then(
      () => toast.success('위치가 복사되었습니다.'), // clipboard successfully set
      () => toast.error('위치 복사에 실패했습니다.') // clipboard write failed);
    );
}
