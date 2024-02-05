import MonsterCount from './MonsterCount';
import styles from './css/index.module.css';
import { dohyeon } from '@/utils/fonts';

type Props = {
  monsterNum: number;
};

export default function IntroduceSection({ monsterNum }: Props) {
  return (
    <section className={`${dohyeon.className} ${styles.container}`}>
      <MonsterCount monsterNum={monsterNum} />
      <span>마리의 특별한 등록법 및 </span>
      <br />
      <span>월드맵 검색에 없는 몬스터의</span>
      <br />
      <span>등록법을 확인하세요!</span>
    </section>
  );
}
