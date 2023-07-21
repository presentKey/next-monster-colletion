import { dohyeon } from '@/utils/fonts';
import styles from './css/Headline.module.css';

type Props = {
  title: string;
};

export default function Headline({ title }: Props) {
  return (
    <h2 className={`${styles.title} ${dohyeon.className}`}>
      <span>{title}</span>
    </h2>
  );
}
