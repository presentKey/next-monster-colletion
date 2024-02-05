import BoxOpenIcon from '../../../common/icons/BoxOpenIcon';
import styles from './css/EmptyList.module.css';

export default function EmptyList() {
  return (
    <div className={styles.container}>
      <BoxOpenIcon />
      <p className={styles.text}>북마크가 비어있습니다.</p>
    </div>
  );
}
