import { SearchMonster } from '@/model/monster';
import Link from 'next/link';
import styles from './css/SearchList.module.css';

type Props = {
  monsters: SearchMonster[];
  cursor?: number;
  onCloseList?: () => void;
  onCloseSearchBar?: () => void;
};

export default function SearchList({
  monsters,
  cursor,
  onCloseList,
  onCloseSearchBar,
}: Props) {
  const handleClose = () => {
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
            onClick={handleClose}
          >
            {name}
          </Link>
        </li>
      ))}
    </ol>
  );
}
