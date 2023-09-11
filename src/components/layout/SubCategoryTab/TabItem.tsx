import { useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './css/TabItem.module.css';
import { throttle } from 'lodash';

type Props = {
  index: number;
  active: number;
  title: string;
  scrollLeft: number | undefined;
  onClick: (e: React.MouseEvent, index: number) => void;
  saveTabPosition: (index: number, position: number) => void;
};

export default function TabItem({
  index,
  active,
  title,
  scrollLeft,
  onClick,
  saveTabPosition,
}: Props) {
  const itemRef = useRef<HTMLLIElement>(null);
  const throttleHandler = useMemo(
    () =>
      throttle(() => {
        if (
          window.matchMedia('(max-width: 48rem)').matches &&
          itemRef.current &&
          scrollLeft !== undefined
        ) {
          saveTabPosition(
            index,
            itemRef.current.getBoundingClientRect().left + scrollLeft
          );
        }
      }, 700),
    [index, saveTabPosition, scrollLeft]
  );

  const detectTabPosition = useCallback(throttleHandler, [throttleHandler]);

  useEffect(() => {
    detectTabPosition();
  }, [detectTabPosition]);

  useEffect(() => {
    window.addEventListener('resize', detectTabPosition);
    return () => {
      window.removeEventListener('resize', detectTabPosition);
    };
  }, [detectTabPosition]);

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
