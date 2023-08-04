import styles from './css/CheckButton.module.css';

type Props = {
  id: string;
  check: boolean;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckButton({ id, text, check, onChange }: Props) {
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
        {text}
      </label>
    </div>
  );
}
