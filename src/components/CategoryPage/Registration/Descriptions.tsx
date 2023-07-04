import InfoIcon from '@/components/common/icons/InfoIcon';
import styles from './css/Descriptions.module.css';
import ChevronIcon from '@/components/common/icons/ChevronIcon';

type Props = {
  descriptions: string[];
  isGroup: boolean;
};

export default function Descriptions({ descriptions, isGroup }: Props) {
  return (
    <ol className={`${styles.list} ${isGroup && styles['group']}`}>
      {descriptions.map((text, index) => (
        <li className={styles.item} key={index}>
          {(isGroup || index === 0) && (
            <div className={styles['info-icon']}>
              <InfoIcon />
            </div>
          )}

          <span className={styles.text}>{text}</span>

          {!isGroup && index !== descriptions.length - 1 && (
            <div className={styles['chevron-icon']}>
              <ChevronIcon size='normal' />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
