import styles from './css/Label.module.css';

type Props = {
  text: string;
};

export default function Label({ text }: Props) {
  return <div className={styles.label}>{text}</div>;
}
