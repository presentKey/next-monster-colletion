import { EliteMonster } from '@/model/monster';
import styles from './css/EliteCard.module.css';
import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd';
import useDndPreviewLine from '@/recoil/DragAndDrop/useDndPreviewLine';
import { ELITE_CARD_SET_BTN } from '.';

const CARD = 'CARD';

type DragItem = {
  name: string;
  index: number;
};

type Props = {
  monster: EliteMonster;
  index: number;
  cardSetBtn: ELITE_CARD_SET_BTN;
  modifierCheck: boolean;
  nameCheck: boolean;
  cardMove: (dragIndex: number, hoverIndex: number) => void;
  onRegisterClick: (monsterName: string) => void;
};

export default function EliteCard({
  monster,
  index: cardIndex,
  cardSetBtn,
  modifierCheck,
  nameCheck,
  cardMove,
  onRegisterClick,
}: Props) {
  const monsterName = monster.name && monster.name.replace('[★] ', '');
  const { previewLine, handlePreviewLine, resetPreviewLine } =
    useDndPreviewLine();

  const [{ isDragging }, dragRef] = useDrag({
    type: CARD, // useDrop의 accept와 일치
    item: { name: monster.name, index: cardIndex }, // 드래그 중인 card 정보
    canDrag: () => cardSetBtn === 'SAVE' && true, // '컬렉션 저장' 버튼이 활성화 되어있으면 드래그 가능
    collect: (monitor) => ({ isDragging: monitor.isDragging() }), // 현재 드래깅중인지 아닌지 판별 변수를 리턴
    end: (item, monitor) => {
      // 드래그가 끝났을 때 동작
      resetPreviewLine();
      const { name: dragName, index: dragIndex } = item;
      // 드랍 영역 밖에 떨어졌을 때, 원래 위치 유지
      if (!monitor.didDrop()) {
        cardMove(dragIndex, cardIndex);
      }
    },
  });

  const [, dropRef] = useDrop({
    accept: CARD, // useDrag의 type과 일치
    hover: () => handlePreviewLine(cardIndex),
    // 드래그 중인 card가 다른 card에 떨어졌을 때 동작
    drop: ({ index: dragIndex }: DragItem) => {
      cardMove(dragIndex, cardIndex);
      resetPreviewLine();
    },
  });

  return (
    <>
      <div
        className={`${styles.card} ${isDragging && styles['is-dragging']} 
        ${monster.isRegistred && styles['is-registred']} 
        ${!modifierCheck && !nameCheck && styles['green']} 
        ${cardSetBtn === 'SAVE' && styles['cursor-grab']}
       `}
        ref={(node) => dragRef(dropRef(node))}
        onClick={() => onRegisterClick(monster.name)}
      >
        <div className={styles['image-wrap']}>
          <Image
            className={styles.image}
            src={`/images/elite-monsters/${monsterName}.png`}
            alt={`${monster.name} 엘몬 몬컬 이미지`}
            fill
            sizes='70px'
          />
        </div>

        {(modifierCheck || nameCheck) && (
          <div className={styles['name-container']}>
            {modifierCheck && (
              <div className={styles['modifier']}>
                <span>{monster.modifier.first}</span>
                {monster.modifier.second && (
                  <span>{monster.modifier.second}</span>
                )}
              </div>
            )}
            {nameCheck && <span className={styles.name}>{monster.name}</span>}
          </div>
        )}
      </div>

      <div
        className={`${styles['preview-line']} ${
          previewLine === cardIndex && styles.destination
        }`}
      />
    </>
  );
}
