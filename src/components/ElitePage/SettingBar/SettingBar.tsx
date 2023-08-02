import { EliteCollections } from '@/model/monster';
import { saveEliteCollections } from '@/service/request/eliteCollection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

type Props = {
  eliteList: EliteCollections[];
};

export default function SettingBar({ eliteList }: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { mutate: saveMutate } = useMutation(
    () => saveEliteCollections(eliteList),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['myCollection', session?.user.uid]),
      onError: () => {},
    }
  );
  const handleSaveClick = () => {
    if (!session) {
      toast.dismiss();
      toast.warn('구글 및 비회원 로그인을 해주세요.');
      return;
    }
    saveMutate();
  };
  return (
    <div>
      <button type='button' onClick={handleSaveClick}>
        저장하기
      </button>
    </div>
  );
}
