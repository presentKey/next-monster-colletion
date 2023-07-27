import styles from './css/SearchForm.module.css';
import SearchIcon from '../icons/SearchIcon';
import CloseIcon from '../icons/CloseIcon';

type Props = {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextClear: () => void;
  hidden?: boolean;
};

export default function SearchForm({
  text,
  onChange,
  onTextClear,
  hidden = false,
}: Props) {
  return (
    <form className={`${styles.form} ${hidden && 'sm-hidden'} `}>
      <div className={styles.container}>
        <input
          className={styles.search}
          type='text'
          placeholder='몬스터 검색'
          spellCheck={false}
          value={text}
          onChange={onChange}
        />
        {text.length > 0 && (
          <button
            className={styles['reset-button']}
            type='button'
            onClick={onTextClear}
          >
            <CloseIcon size='small' />
          </button>
        )}
      </div>

      <button className={styles['submit-button']} type='submit'>
        <SearchIcon color='white' />
      </button>
    </form>
  );
}
