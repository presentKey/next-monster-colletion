import styles from './css/index.module.css';
import SearchIcon from '../../icons/SearchIcon';
import CloseIcon from '../../icons/CloseIcon';
import { SearchMonster } from '@/model/monster';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Props = {
  text: string;
  selected: SearchMonster | null;
  hasShadow?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTextClear: () => void;
  onClick?: () => void;
  onCloseList?: () => void;
  onCloseSearchBar?: () => void;
};

export default function SearchForm({
  text,
  selected,
  hasShadow = true,
  onChange,
  onTextClear,
  onClick,
  onCloseList,
  onCloseSearchBar,
}: Props) {
  const router = useRouter();
  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0 || !selected) {
      toast.dismiss();
      toast.warn('몬스터를 선택해주세요');
      return;
    }

    onCloseList && onCloseList();
    onCloseSearchBar && onCloseSearchBar();
    router.push(`/category/${selected.path}?search=${selected.name}`);
  };

  return (
    <form
      className={`${styles.form} ${hasShadow && styles.shadow}`}
      onSubmit={handleSumbit}
    >
      <input
        className={styles.search}
        type='text'
        placeholder='몬스터 검색'
        spellCheck={false}
        value={text}
        onChange={onChange}
        onClick={onClick}
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

      <button className={styles['submit-button']} type='submit'>
        <SearchIcon color='white' />
      </button>
    </form>
  );
}
