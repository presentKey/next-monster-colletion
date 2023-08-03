import styles from './css/CheckButton.module.css';

type Props = {
  id: string;
  check: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckButton({ id, check, onChange }: Props) {
  return (
    <div className={styles.button} role='button'>
      <input
        className={styles.check}
        type='checkbox'
        id={id}
        checked={check}
        onChange={(e) => onChange(e)}
      />
      <label className={styles.label} htmlFor={id}>
        수식어 보기
      </label>
    </div>
  );
}
