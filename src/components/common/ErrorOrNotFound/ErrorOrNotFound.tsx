import Link from 'next/link';
import styles from './css/ErrorOrNotFound.module.css';

type Props = {
  text: string;
};

export default function ErrorOrNotFound({ text }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.text}>{text}</span>
      <Link className={styles.link} href='/'>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
