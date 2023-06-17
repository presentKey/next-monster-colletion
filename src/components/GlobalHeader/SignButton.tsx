import styles from './css/SignButton.module.css';

type Props = {
  text: '로그인' | '로그아웃';
  onClick: () => void;
};

export default function SignButton({ text, onClick }: Props) {
  return (
    <button className={styles.sign} type='button' onClick={onClick}>
      {text}
    </button>
  );
}
