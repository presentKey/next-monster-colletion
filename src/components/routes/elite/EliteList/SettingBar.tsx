import { EliteCollections } from '@/model/monster';
import { saveEliteCollections } from '@/service/request/eliteCollection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { ToastOptions, toast } from 'react-toastify';
import styles from './css/SettingBar.module.css';
import { useState } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CheckButton from './CheckButton';
import { ELITE_CARD_SET_BTN } from '.';

type Props = {
  clientList: EliteCollections[];
  cardSetBtn: ELITE_CARD_SET_BTN;
  modifierCheck: boolean;
  nameCheck: boolean;
  onCardSetButtonToggle: () => void;
  onModifierCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameCheckChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortByRegister: () => void;
  onSortByModifier: () => void;
};

export default function SettingBar({
  clientList,
  cardSetBtn,
  modifierCheck,
  nameCheck,
  onCardSetButtonToggle,
  onModifierCheckChange,
  onNameCheckChange,
  onSortByRegister,
  onSortByModifier,
}: Props) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { mutate: saveMutate } = useMutation(
    () => saveEliteCollections(clientList),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(['myCollection', session?.user.uid]),
    }
  );

  /** 변경된 엘리트 리스트를 저장 */
  const handleSaveClick = () => {
    const toastPosition: ToastOptions<{}> = {
      position: 'top-center',
    };

    setLoading(true);
    if (!session) {
      toast.dismiss();
      toast.warn('구글 및 비회원 로그인을 해주세요.', toastPosition);
      setLoading(false);
      return;
    }

    saveMutate(undefined, {
      onSuccess: () =>
        toast.success('엘몬 컬렉션이 저장되었습니다.', toastPosition),
      onError: () => toast.warn('저장 오류가 발생했습니다.', toastPosition),
      onSettled: () => {
        setLoading(false);
        onCardSetButtonToggle();
      },
    });
  };

  const handleSetButtonClick = () =>
    cardSetBtn === 'SAVE' ? handleSaveClick() : onCardSetButtonToggle();

  return (
    <div className={styles.bar}>
      <div className={styles['top-container']}>
        <button
          className={`${styles['card-set-button']}
        ${cardSetBtn === 'SAVE' && styles['is-save']}
        `}
          type='button'
          onClick={handleSetButtonClick}
          disabled={loading}
        >
          {!loading && (cardSetBtn === 'SAVE' ? '컬렉션 저장' : '카드 변경')}
          {loading && <LoadingSpinner size='small' />}
        </button>

        <div className={styles['check-btn-container']}>
          <CheckButton
            id='modifier'
            text='수식어 보기'
            check={modifierCheck}
            onChange={onModifierCheckChange}
          />
          <CheckButton
            id='eliteName'
            text='이름 보기'
            check={nameCheck}
            onChange={onNameCheckChange}
          />
        </div>
      </div>

      <div
        className={`${styles['sort-container']} 
      ${cardSetBtn === 'SAVE' && styles['is-open']}`}
      >
        <button type='button' onClick={onSortByRegister}>
          등록 위로 모으기
        </button>
        <button type='button' onClick={onSortByModifier}>
          수식어 정렬
        </button>
      </div>
    </div>
  );
}
