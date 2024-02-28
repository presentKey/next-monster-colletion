import { resetBookmark } from '@/service/request/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from './css/ResetButton.module.css';

export default function BookmarkResetButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: resetMutate } = useMutation(() => resetBookmark(), {
    onSuccess: () => {
      queryClient.resetQueries(['SavedBookmark', session?.user.uid]);
      queryClient.resetQueries(['bookmark', session?.user.uid]);
      router.push('/');
    },
  });

  const handleButtonClick = () => {
    resetMutate(undefined, {
      onSuccess: () => toast.success('북마크 초기화 성공'),
      onError: () => toast.warn('북마크 초기화 실패'),
    });
  };

  if (!session) return;
  return (
    <div className={styles.container}>
      <span>오류가 계속 발생 시, 북마크를 초기화해보세요.</span>
      <button
        className={styles.button}
        type='button'
        onClick={handleButtonClick}
      >
        북마크 초기화
      </button>
    </div>
  );
}
