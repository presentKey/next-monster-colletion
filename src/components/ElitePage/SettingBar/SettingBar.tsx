import { EliteCollections } from '@/model/monster';
import { saveEliteCollections } from '@/service/request/eliteCollection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import styles from './css/SettingBar.module.css';
import { useState } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

type Props = {
  eliteList: EliteCollections[];
  save: boolean;
  onAbleLoad: () => void;
};

export default function SettingBar({ eliteList, save, onAbleLoad }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { mutate: saveMutate } = useMutation(
    () => saveEliteCollections(eliteList),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['myCollection', session?.user.uid]),
    }
  );
  const handleSaveClick = () => {
    setLoading(true);
    if (!session) {
      toast.dismiss();
      toast.warn('구글 및 비회원 로그인을 해주세요.');
      onAbleLoad();
      setLoading(false);
      return;
    }

    saveMutate(undefined, {
      onSuccess: () => toast.success('엘몬 컬렉션이 저장되었습니다.'),
      onError: () => toast.warn('저장 오류가 발생했습니다.'),
      onSettled: () => {
        onAbleLoad();
        setLoading(false);
      },
    });
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles['save-button']} ${
          !save && session && styles['not-saved']
        } `}
        type='button'
        onClick={handleSaveClick}
        disabled={save || loading}
      >
        {loading ? <LoadingSpinner size='small' /> : '저장하기'}
      </button>
    </div>
  );
}
