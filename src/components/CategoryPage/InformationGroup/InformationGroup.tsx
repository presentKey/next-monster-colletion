import { RegisterInfoByCategory } from '@/model/information';
import MonsterCardList from '../../common/MonsterCardList/MonsterCardList';
import Registration from '../../common/Registration/Registration';
import styles from './css/InformationGroup.module.css';

type Props = {
  information: RegisterInfoByCategory[];
};

export default function InformationGroup({ information }: Props) {
  return (
    <>
      {information.map((info, index) => (
        <div className={styles.container} key={index}>
          <MonsterCardList monsters={info.monsters} />
          <Registration
            registers={info.registers}
            monsterName={info.monsters[0].name}
            youtube={info.monsters[0].youtube}
          />
        </div>
      ))}
    </>
  );
}
