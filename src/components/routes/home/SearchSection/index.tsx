import SearchFormWithList from '@/components/common/Search/SearchFormWithList';
import { SearchMonster } from '@/model/monster';
import styles from './css/index.module.css';
import { Suspense } from 'react';

type Props = {
  monsters: SearchMonster[];
};

export default async function SearchSection({ monsters }: Props) {
  return (
    <section className={styles.container}>
      <Suspense>
        <SearchFormWithList monsters={monsters} />
      </Suspense>
    </section>
  );
}
