import { Boss } from '@/model/information';
import styles from './css/Boss.module.css';
import InfoIcon from '../icons/InfoIcon';
import Label from './Label';

type Props = {
  boss: Boss;
};

export default function Boss({ boss }: Props) {
  return (
    <div className={styles.boss}>
      <div className={styles.icon}>
        <InfoIcon />
      </div>

      <Label text={`${boss.name}`} size='small' color='yellow' />

      {boss?.difficulty && (
        <Label text={`${boss.difficulty}`} size='small' color='yellow' />
      )}

      {boss?.description && (
        <span className='description'>{boss.description}</span>
      )}
    </div>
  );
}
