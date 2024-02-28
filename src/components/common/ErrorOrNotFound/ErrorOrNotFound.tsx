import Link from 'next/link';
import styles from './css/ErrorOrNotFound.module.css';

type Props = {
  text: string;
  children?: React.ReactNode;
};

export default function ErrorOrNotFound({ text, children }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.text}>{text}</span>
      <Link className={styles.link} href='/'>
        홈으로 돌아가기
      </Link>
      {children}
    </div>
  );
}
