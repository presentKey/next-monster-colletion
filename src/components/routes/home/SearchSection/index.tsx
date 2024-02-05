import SearchFormWithList from '@/components/common/Search/SearchFormWithList';
import { SearchMonster } from '@/model/monster';
import styles from './css/index.module.css';

type Props = {
  monsters: SearchMonster[];
};

export default async function SearchSection({ monsters }: Props) {
  return (
    <section className={styles.container}>
      <SearchFormWithList monsters={monsters} smHidden={false} />
    </section>
  );
}
