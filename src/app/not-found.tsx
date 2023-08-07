import Link from 'next/link';
import styles from './not-found.module.css';

export default function GlobalNotFound() {
  return (
    <div className={styles.container}>
      <span className={styles.text}>페이지를 찾을 수 없습니다.</span>
      <Link className={styles.link} href='/'>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
