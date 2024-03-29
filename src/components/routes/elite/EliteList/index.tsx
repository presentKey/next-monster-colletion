'use client';
import { EliteCollections } from '@/model/monster';
import EliteCard from './EliteCard';
import styles from './css/index.module.css';
import { useSession } from 'next-auth/react';
import { getUserEliteCollections } from '@/service/request/eliteCollection';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useCallback, useEffect, useState } from 'react';
import SettingBar from './SettingBar';
import useCheckButton from './hooks/useCheckButton';
import { ELITENAME, MODIFIER } from '@/components/InitialSetup';
import Tooltip from '@/components/common/Tooltip';

type Props = {
  defaultList: EliteCollections[];
};

const CARD_CHANGE_BTN = 'CHANGE';
const CARD_SAVE_BTN = 'SAVE';
export type ELITE_CARD_SET_BTN = typeof CARD_CHANGE_BTN | typeof CARD_SAVE_BTN;

export default function EliteList({ defaultList }: Props) {
  const { data: session } = useSession();
  const [cardSetBtn, setCardSetBtn] =
    useState<ELITE_CARD_SET_BTN>(CARD_CHANGE_BTN); // CHANGE = '카드 변경', SAVE = '컬렉션 저장' 버튼 렌더링 상태
  const [modifierCheck, handleModifierCheck] = useCheckButton(MODIFIER);
  const [nameCheck, handleNameCheck] = useCheckButton(ELITENAME);
  const { isLoading, data: myList } = useQuery(
    ['myCollection', session?.user.uid],
    () => getUserEliteCollections(session?.user, defaultList),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  const [clientList, setClientList] = useState<EliteCollections[] | []>([]);

  /**
   * 두 카드의 위치 변경
   * @param dragIndex - 드래그 중인 카드의 index
   * @param hoverIndex - 바꿀 위치에 있는 카드의 index
   * */
  const cardMove = useCallback((dragIndex: number, hoverIndex: number) => {
    setClientList((prev) => {
      const newList = [...prev];
      [newList[dragIndex], newList[hoverIndex]] = [
        newList[hoverIndex],
        newList[dragIndex],
      ];

      return newList;
    });
  }, []);

  /** 저장 버튼이 활성화 되어있는 경우, 몬스터 등록 상태 변경 */
  const handleRegisterClick = (monsterName: string) => {
    if (cardSetBtn === 'SAVE') {
      setClientList((prev) =>
        prev.map((monster) => {
          if (monster.elite.name === monsterName) {
            return {
              elite: {
                ...monster.elite,
                isRegistred: !monster.elite.isRegistred,
              },
            };
          }

          return monster;
        })
      );
    }
  };

  /** 등록한 몬스터를 위로 모으기 */
  const handleSortByRegister = () => {
    setClientList((prev) =>
      [...prev].sort(
        (a, b) =>
          Number(b.elite.isRegistred || false) -
          Number(a.elite.isRegistred || false)
      )
    );
  };

  /** 수식어별 정렬 */
  const handleSortByModifier = () => {
    setClientList((prev) =>
      [...prev].sort((a, b) =>
        a.elite.modifier.first.localeCompare(b.elite.modifier.first)
      )
    );
  };

  /** 카드 설정 버튼 토글 시, '카드 변경' 또는 '컬렉션 저장' 버튼 렌더링 */
  const handleCardSetButtonToggle = () =>
    setCardSetBtn((prev) =>
      prev === 'CHANGE' ? CARD_SAVE_BTN : CARD_CHANGE_BTN
    );

  useEffect(() => setClientList(myList ?? defaultList), [myList, defaultList]);

  return (
    <>
      {clientList && (
        <>
          <SettingBar
            clientList={clientList}
            cardSetBtn={cardSetBtn}
            modifierCheck={modifierCheck}
            nameCheck={nameCheck}
            onCardSetButtonToggle={handleCardSetButtonToggle}
            onModifierCheckChange={handleModifierCheck}
            onNameCheckChange={handleNameCheck}
            onSortByRegister={handleSortByRegister}
            onSortByModifier={handleSortByModifier}
          />
          <ol
            className={`${styles.list} ${
              cardSetBtn === 'SAVE' && styles['mobile-scroll-area']
            }`}
          >
            {clientList.map((monster, index) => (
              <li className={styles.item} key={monster.elite.name}>
                <EliteCard
                  monster={monster.elite}
                  index={index}
                  cardSetBtn={cardSetBtn}
                  modifierCheck={modifierCheck}
                  nameCheck={nameCheck}
                  cardMove={cardMove}
                  onRegisterClick={handleRegisterClick}
                  data-tooltip-id='elite-tooltip'
                  data-tooltip-content={`${monster.elite.modifier.first} ${
                    monster.elite.modifier?.second || ''
                  } ${monster.elite.name}`}
                />
              </li>
            ))}

            {isLoading && (
              <div className={styles.loading}>
                <LoadingSpinner position='top' color='red' />
              </div>
            )}
          </ol>

          <Tooltip id='elite-tooltip' />
        </>
      )}
    </>
  );
}
