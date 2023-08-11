import SavedBookmark from '@/components/BookmarkPage/SavedBookmark';
import styles from './page.module.css';
import Notice from '@/components/common/Notice/Notice';

const NOTE_TEXT = ['몬스터의 ☆ 클릭 시, 북마크를 등록/해제 할 수 있습니다.'];

export default function BookmarkPage() {
  return (
    <div className={styles.container}>
      <Notice type='note' textList={NOTE_TEXT} margin='1rem' />
      <SavedBookmark />
    </div>
  );
}
