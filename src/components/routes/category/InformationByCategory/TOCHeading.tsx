import { dohyeon } from '@/utils/fonts';
import styles from './css/TOCHeading.module.css';

type Props = {
  title: string;
  index: number;
};

export default function TOCHeading({ title, index }: Props) {
  return (
    <h2
      className={`${dohyeon.className} ${styles.title} toc-heading`}
      data-index={index}
    >
      <span>{title}</span>
    </h2>
  );
}
