import { EliteMonster } from '@/model/monster';
import styles from './css/EliteCard.module.css';
import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd';
import useEliteDragAndDrop from '@/recoil/DragAndDrop/useEliteDragAndDrop';

const CARD = 'CARD';

type DragItem = {
  name: string;
  index: number;
};

type Props = {
  monster: EliteMonster;
  index: number;
  modifierCheck: boolean;
  nameCheck: boolean;
  cardMove: (dragIndex: number, hoverIndex: number) => void;
  onDisableUnload: () => void;
  onRegisterClick: (monsterName: string) => void;
};

export default function EliteCard({
  monster,
  index: cardIndex,
  modifierCheck,
  nameCheck,
  cardMove,
  onDisableUnload,
  onRegisterClick,
}: Props) {
  const monsterName = monster.name && monster.name.replace('[★] ', '');
  const { destination, handleDestination, clearDestination } =
    useEliteDragAndDrop();
  const [{ isDragging }, dragRef] = useDrag({
    type: CARD, // useDrop의 accept와 일치
    item: { name: monster.name, index: cardIndex }, // 드래그 중인 card 정보
    collect: (monitor) => ({ isDragging: monitor.isDragging() }), // 현재 드래깅중인지 아닌지 판별 변수를 리턴
    end: () => clearDestination(), // 드래그가 끝났을 때 동작
  });

  const [, dropRef] = useDrop({
    accept: CARD, // useDrag의 type과 일치
    hover: () => handleDestination(cardIndex),
    // 드래그 중인 card가 다른 card에 떨어졌을 때 동작
    drop: ({ index: dragIndex }: DragItem) => {
      if (dragIndex === cardIndex) return;

      cardMove(dragIndex, cardIndex);
      clearDestination();
      onDisableUnload();
    },
  });

  return (
    <>
      <div
        className={`${styles.card} ${isDragging && styles['is-dragging']} ${
          monster.isRegistred && styles['is-registred']
        } ${!modifierCheck && !nameCheck && styles['red']}`}
        ref={(node) => dragRef(dropRef(node))}
        onClick={() => {
          onRegisterClick(monster.name);
          onDisableUnload();
        }}
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
        className={`${styles.mark} ${
          destination === cardIndex && styles.destination
        }`}
      />
    </>
  );
}
