import { useEffect, useRef } from 'react';
import styles from './css/TabItem.module.css';

type Props = {
  index: number;
  active: number;
  title: string;
  onClick: (e: React.MouseEvent, index: number) => void;
  saveTabPosition: (position: number) => void;
};

export default function TabItem({
  index,
  active,
  title,
  onClick,
  saveTabPosition,
}: Props) {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // 모바일 사이즈
    if (itemRef.current && window.matchMedia('(max-width: 48rem)').matches) {
      saveTabPosition(itemRef.current?.getBoundingClientRect().left);
    }
  }, [saveTabPosition]);

  return (
    <li
      className={`${styles.item} ${index === active && styles['is-active']}`}
      key={title}
      ref={itemRef}
      role='tab'
      aria-labelledby={title}
      onClick={(e: React.MouseEvent) => onClick(e, index)}
    >
      {title}
    </li>
  );
}
