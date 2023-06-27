import { RegisterInfoByCategory } from '@/model/information';
import MonsterCardList from './MonsterCardList';
import Registration from './Registration';

type Props = {
  information: RegisterInfoByCategory[];
};

export default function InformationGroup({ information }: Props) {
  return (
    <>
      {information.map((info, index) => (
        <div key={index}>
          <MonsterCardList monsters={info.monsters} />
          <Registration registers={info.registers} />
        </div>
      ))}
    </>
  );
}
