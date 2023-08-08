import styles from './css/ExplanationIndex.module.css';

type Props = {
  length: number;
  index: number;
};

export default function ExplanationIndex({ length, index }: Props) {
  return (
    <>
      {length !== 1 && <span className={styles.index}>{`${index + 1}.`}</span>}
    </>
  );
}
