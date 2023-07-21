import SavedBookmark from '@/components/BookmarkPage/SavedBookmark';
import Headline from '@/components/common/Headline/Headline';
import styles from './page.module.css';

export default function BookmarkPage() {
  return (
    <div className={styles.container}>
      <Headline title='북마크' />
      <SavedBookmark />
    </div>
  );
}
