import BoxOpenIcon from '../common/icons/BoxOpenIcon';
import styles from './css/EmptyBookmark.module.css';

export default function EmptyBookmark() {
  return (
    <div className={styles.container}>
      <BoxOpenIcon />
      <p className={styles.text}>북마크가 비어있습니다.</p>
    </div>
  );
}
