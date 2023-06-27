import { RegisterInfoByCategory } from '@/model/information';
import MonsterCardList from './MonsterCardList';

type Props = {
  information: RegisterInfoByCategory[];
};

export default function InformationGroup({ information }: Props) {
  return (
    <>
      {information.map((info, index) => (
        <div key={index}>
          <MonsterCardList monsters={info.monsters} />
          {info.registers.map((register, index) => (
            <span key={index}>{register.tag}</span>
          ))}
        </div>
      ))}
    </>
  );
}
