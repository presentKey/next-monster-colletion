import SavedBookmark from '@/components/BookmarkPage/SavedBookmark';
import TabPanel from '@/components/common/TapPanel/TapPanel';
import styles from './page.module.css';

export default function BookmarkPage() {
  return (
    <div className={styles.container}>
      <TabPanel title='북마크' />
      <SavedBookmark />
    </div>
  );
}
