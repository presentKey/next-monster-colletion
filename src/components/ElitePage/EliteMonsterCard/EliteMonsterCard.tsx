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
  cardMove: (dragIndex: number, hoverIndex: number) => void;
};

export default function EliteMonsterCard({ monster, index, cardMove }: Props) {
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
    },
  });

  return (
    <>
      <div
        className={`${styles.card} ${isDragging && styles['is-dragging']}`}
        ref={(node) => {
          dragRef(dropRef(node));
        }}
      >
        <div className={styles['image-wrap']}>
          <Image
            className={styles.image}
            src={`/images/elite-monsters/${monster.name}.png`}
            alt={monster.name}
            fill
            sizes='(max-width: 96rem) 3.5rem'
          />
        </div>
        <div className={styles['name-container']}>
          <div className={styles['modifier']}>
            <span>{monster.modifier.first}</span>
            {monster.modifier.second && <span>{monster.modifier.second}</span>}
          </div>
          <span className={styles.name}>{monster.name}</span>
        </div>
      </div>
      <div
        className={`${styles.mark} ${
          destination === index && styles.destination
        }`}
      />
    </>
  );
}
