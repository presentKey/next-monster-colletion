import styles from './css/Notice.module.css';
import CheckIcon from './icons/CheckIcon';
import ExclamationIcon from './icons/ExclamationIcon';

type Props = {
  type: 'note' | 'tip';
  text: string;
};

export default function Notice({ type, text }: Props) {
  return (
    <div className={styles.notice}>
      <div className={`${styles.top} ${styles[getTopStyle(type)]}`}>
        <span>{type === 'note' ? <ExclamationIcon /> : <CheckIcon />}</span>
        <h4 className={styles.title}>{type === 'note' ? 'Note' : 'Tip'}</h4>
      </div>
      <p className={`${styles.message} ${styles[getMessageStyle(type)]}`}>
        {text}
      </p>
    </div>
  );
}

function getTopStyle(type: string) {
  return type === 'note' ? 'blue' : 'green';
}

function getMessageStyle(type: string) {
  return type === 'note' ? 'blue' : 'green';
}
