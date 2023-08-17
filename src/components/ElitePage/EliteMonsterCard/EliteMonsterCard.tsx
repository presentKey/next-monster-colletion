import { EliteMonster } from '@/model/monster';
import styles from './css/EliteMonsterCard.module.css';
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

export default function EliteMonsterCard({
  monster,
  index,
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
    type: CARD,
    item: { name: monster.name, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: () => clearDestination(),
  });

  const [, dropRef] = useDrop({
    accept: CARD,
    hover: () => handleDestination(index),
    drop: ({ index: dragIndex }: DragItem) => {
      if (dragIndex === index) {
        return;
      }
      cardMove(dragIndex, index);
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
          destination === index && styles.destination
        }`}
      />
    </>
  );
}
