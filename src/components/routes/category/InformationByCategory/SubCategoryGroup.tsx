import { RegisterInfoByCategory } from '@/model/information';
import MonsterCardList from '../../../common/MonsterCardList';
import RegistrationAct from '../../../common/RegistrationAct';
import styles from './css/SubCategoryGroup.module.css';
import YoutubeButton from '@/components/common/YoutubeButton';

type Props = {
  information: RegisterInfoByCategory[];
};

export default function SubCategoryGroup({ information }: Props) {
  return (
    <>
      {information.map((info, index) => (
        <div className={styles.container} key={index}>
          <MonsterCardList monsters={info.monsters} />

          {info.monsters[0].youtube && (
            <YoutubeButton youtube={info.monsters[0].youtube} />
          )}

          <RegistrationAct
            registers={info.registers}
            monsterName={info.monsters[0].name}
          />
        </div>
      ))}
    </>
  );
}
