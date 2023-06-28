import ChevronIcon from '../icons/ChevronIcon';
import InfoIcon from '../icons/InfoIcon';
import styles from './css/Descriptions.module.css';

type Props = {
  descriptions: string[];
};

export default function Descriptions({ descriptions }: Props) {
  return (
    <ol className={styles.list}>
      {descriptions.map((text, index) => (
        <li className={styles.item} key={index}>
          {index === 0 && (
            <div className={styles['info-icon']}>
              <InfoIcon />
            </div>
          )}
          <span className={styles.text}>{text}</span>
          {index !== descriptions.length - 1 && (
            <div className={styles['chevron-icon']}>
              <ChevronIcon size='normal' />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
