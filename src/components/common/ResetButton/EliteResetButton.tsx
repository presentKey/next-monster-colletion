import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import styles from './css/ResetButton.module.css';
import { resetEliteCollections } from '@/service/request/eliteCollection';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default function EliteResetButton() {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: resetMutate } = useMutation(() => resetEliteCollections(), {
    onSuccess: () => {
      queryClient.resetQueries(['myCollection', session?.user.uid]);
      router.push('/');
    },
  });

  const handleButtonClick = () => {
    setIsLoading(true);

    resetMutate(undefined, {
      onSuccess: () => toast.success('엘리트 초기화 성공'),
      onError: () => toast.warn('엘리트 초기화 실패'),
      onSettled: () => setIsLoading(false),
    });
  };

  if (!session) return;
  return (
    <div className={styles.container}>
      <span>오류가 계속 발생 시, 엘몬 컬렉션을 초기화해보세요.</span>
      <button
        className={styles.button}
        type='button'
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        엘리트 초기화
        {isLoading && <LoadingSpinner size='small' />}
      </button>
    </div>
  );
}
