import styles from './css/SearchForm.module.css';
import SearchIcon from '../icons/SearchIcon';

export default function SearchForm() {
  return (
    <form className={`sm-hidden ${styles.form}`}>
      <input className={styles.search} type='text' placeholder='몬스터 검색' />
      <button className={styles.button} type='submit'>
        <SearchIcon />
      </button>
    </form>
  );
}
