import styles from './css/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.title}>몬스터컬렉션</h2>
        <address className={styles.address}>moncol.help@gmail.com</address>
      </div>
      <h3 className={styles.message}>메이플스토리의 공식 사이트가 아닙니다.</h3>
    </footer>
  );
}
