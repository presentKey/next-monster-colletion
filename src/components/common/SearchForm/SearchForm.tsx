import styles from './css/SearchForm.module.css';
import SearchIcon from '../icons/SearchIcon';

type Props = {
  hidden?: boolean;
};

export default function SearchForm({ hidden = false }: Props) {
  return (
    <form className={`${styles.form} ${hidden && 'sm-hidden'}`}>
      <input className={styles.search} type='text' placeholder='몬스터 검색' />
      <button className={styles.button} type='submit'>
        <SearchIcon />
      </button>
    </form>
  );
}
