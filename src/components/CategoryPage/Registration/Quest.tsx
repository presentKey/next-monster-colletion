import { Quest } from '@/model/information';
import styles from './css/Quest.module.css';
import Label from './Label';
import InfoIcon from '@/components/icons/InfoIcon';
import ChevronIcon from '@/components/icons/ChevronIcon';

type Props = {
  quests: Quest[];
};

export default function Quest({ quests }: Props) {
  return (
    <ol className={styles.list}>
      {quests.map((quest, index) => (
        <li className={styles.item} key={index}>
          {index === 0 && (
            <div className={styles['info-icon']}>
              <InfoIcon />
            </div>
          )}

          <div className={styles.container}>
            <Label text='QUEST' size='small' color='yellow' />
            <p className={styles.quest}>
              {quest.level && <span>{`[Lv.${quest.level}] `}</span>}
              <span>{quest.name}</span>
            </p>
          </div>

          {index !== quests.length - 1 && (
            <div className={styles['chevron-icon']}>
              <ChevronIcon size='normal' />
            </div>
          )}

          {quest.description && (
            <span className={styles.description}>{`${quest.description}`}</span>
          )}
        </li>
      ))}
    </ol>
  );
}
