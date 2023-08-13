import { SearchMonster } from '@/model/monster';
import Link from 'next/link';
import styles from './css/SearchList.module.css';
import { ForwardedRef, forwardRef } from 'react';

type Props = {
  monsters: SearchMonster[];
  onLinkClick: (name: string) => void;
  cursor?: number | null;
  onCloseList?: () => void;
  onCloseSearchBar?: () => void;
};

const SearchList = forwardRef(
  (
    { monsters, cursor, onLinkClick, onCloseList, onCloseSearchBar }: Props,
    ref: ForwardedRef<HTMLOListElement>
  ) => {
    const handleClick = (name: string) => {
      onLinkClick(name);
      onCloseList && onCloseList();
      onCloseSearchBar && onCloseSearchBar();
    };

    return (
      <ol className={styles.list} ref={ref}>
        {monsters.length === 0 && (
          <p className={styles['not-match']}>일치하는 몬스터가 없습니다.</p>
        )}
        {monsters.map(({ name, path }, index) => (
          <li key={name}>
            <Link
              className={`${styles.link} ${cursor === index && styles.select}`}
              href={{
                pathname: `/category/${path}`,
                query: { search: name },
              }}
              prefetch={false}
              onClick={() => handleClick(name)}
            >
              {name}
            </Link>
          </li>
        ))}
      </ol>
    );
  }
);

SearchList.displayName = 'SearchList';

export default SearchList;
