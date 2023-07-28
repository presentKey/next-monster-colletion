import { SearchMonster } from '@/model/monster';
import Link from 'next/link';
import styles from './css/SearchList.module.css';

type Props = {
  monsters: SearchMonster[];
  cursor?: number;
  onCloseList?: () => void;
};

export default function SearchList({ monsters, cursor, onCloseList }: Props) {
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
            onClick={onCloseList}
          >
            {name}
          </Link>
        </li>
      ))}
    </ol>
  );
}
