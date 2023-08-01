import { EliteMonster } from '@/model/monster';
import styles from './css/EliteMonsterCard.module.css';
import Image from 'next/image';
import { useDrag, useDrop } from 'react-dnd';

const CARD = 'CARD';

type DragItem = {
  name: string;
  index: number;
};

type Props = {
  monster: EliteMonster;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export default function EliteMonsterCard({ monster, index, moveCard }: Props) {
  const [{ isDragging }, dragRef] = useDrag({
    type: CARD,
    item: { name: monster.name, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, dropRef] = useDrop({
    accept: CARD,
    drop({ index: dragIndex }: DragItem) {
      if (dragIndex === index) {
        return;
      }

      moveCard(dragIndex, index);
    },
  });

  return (
    <li
      className={`${styles.item} ${isDragging && styles['is-dragging']}`}
      ref={(node) => {
        dragRef(dropRef(node));
      }}
      draggable={true}
    >
      <div className={`${styles.card}`}>
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
    </li>
  );
}
