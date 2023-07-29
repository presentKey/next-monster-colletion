import { SearchMonster } from '@/model/monster';
import Link from 'next/link';
import styles from './css/SearchList.module.css';

type Props = {
  monsters: SearchMonster[];
  onLinkClick: (name: string) => void;
  cursor?: number;
  onCloseList?: () => void;
  onCloseSearchBar?: () => void;
};

export default function SearchList({
  monsters,
  cursor,
  onLinkClick,
  onCloseList,
  onCloseSearchBar,
}: Props) {
  const handleClick = (name: string) => {
    onLinkClick(name);
    onCloseList && onCloseList();
    onCloseSearchBar && onCloseSearchBar();
  };
  return (
    <ol className={styles.list}>
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
