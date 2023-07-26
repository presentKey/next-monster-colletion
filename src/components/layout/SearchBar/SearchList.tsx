import { SearchMonster } from '@/model/monster';
import Link from 'next/link';
import styles from './css/SearchList.module.css';

type Props = {
  monsters: SearchMonster[];
  text: string;
};

export default function SearchList({ monsters, text }: Props) {
  return (
    <ol className={styles.list}>
      {monsters.map(({ name, path }) => (
        <li
          key={name}
          className={`${styles.item} ${
            name
              .replace(/ /g, '')
              .toUpperCase()
              .includes(text.replace(/ /g, '').toUpperCase()) && styles.show
          }`}
        >
          <Link className={styles.link} href={path ? `/category/${path}` : '/'}>
            {name}
          </Link>
        </li>
      ))}
    </ol>
  );
}
