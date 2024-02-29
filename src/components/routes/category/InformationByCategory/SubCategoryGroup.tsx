import { RegisterInfoByCategory } from '@/model/information';
import MonsterCardList from '../../../common/MonsterCardList/MonsterCardList';
import RegistrationAct from '../../../common/RegistrationAct';
import styles from './css/SubCategoryGroup.module.css';

type Props = {
  information: RegisterInfoByCategory[];
};

export default function SubCategoryGroup({ information }: Props) {
  return (
    <>
      {information.map((info, index) => (
        <div className={styles.container} key={index}>
          <MonsterCardList monsters={info.monsters} />
          <RegistrationAct
            registers={info.registers}
            monsterName={info.monsters[0].name}
            youtube={info.monsters[0].youtube}
          />
        </div>
      ))}
    </>
  );
}
