import { SearchMonster } from '@/model/monster';
import Link from 'next/link';
import styles from './css/index.module.css';
import { ForwardedRef, forwardRef } from 'react';
import { useSearchParams } from 'next/navigation';

type Props = {
  monsters: SearchMonster[];
  onLinkClick: (name: string) => void;
  cursor?: number | null;
  display?: 'mobileSearchBar';
  onCloseList?: () => void;
  onCloseSearchBar?: () => void;
};

const SearchList = forwardRef(
  (
    {
      monsters,
      cursor,
      display,
      onLinkClick,
      onCloseList,
      onCloseSearchBar,
    }: Props,
    ref: ForwardedRef<HTMLOListElement>
  ) => {
    const searchParams = useSearchParams();
    const handleClick = (name: string) => {
      onLinkClick(name);
      onCloseList && onCloseList();
      onCloseSearchBar && onCloseSearchBar();
    };

    return (
      <div
        className={`${styles['list-container']} ${
          display === 'mobileSearchBar' && styles['mobile-search-bar']
        }`}
      >
        <ol className={`${styles.list}`} ref={ref}>
          {monsters.length === 0 && (
            <p className={styles['not-match']}>일치하는 몬스터가 없습니다.</p>
          )}
          {monsters.map(({ name, path }, index) => (
            <li
              key={name}
              className={`${styles.item} ${cursor === index && styles.select}`}
            >
              <Link
                className={`${styles.link}`}
                href={{
                  pathname: `/category/${path}`,
                  query: { search: name },
                }}
                prefetch={false}
                scroll={name !== searchParams.get('search')}
                onClick={() => handleClick(name)}
              >
                {name}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    );
  }
);

SearchList.displayName = 'SearchList';

export default SearchList;
