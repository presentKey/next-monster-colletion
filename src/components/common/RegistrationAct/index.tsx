import { Register } from '@/model/information';
import styles from './css/index.module.css';
import Boss from './Boss';
import Label from './Label';
import Quest from './Quest';
import Location from './Location';
import TimerInfo from './TimerInfo';
import Descriptions from './Descriptions';
import ExplanationIndex from '@/components/common/ExplanationIndex';
import YoutubeButton from './YoutubeButton';

type Props = {
  registers: Register[];
  monsterName: string;
  youtube: string | null | undefined;
};

const labelTags = ['PQ', 'B', 'O', 'TD', 'M'];

export default function RegistrationAct({
  registers,
  monsterName,
  youtube,
}: Props) {
  return (
    <>
      {youtube && <YoutubeButton youtube={youtube} />}
      {registers.map((register, index) => (
        <div className={styles.container} key={index}>
          <ExplanationIndex length={registers.length} index={index} />

          <div className={styles.labels}>
            {register?.job && <Label text={register.job} color='green-dark' />}
            {labelTags.includes(register?.tag?.id) && (
              <Label text={register.tag.name} id={register.tag.id} />
            )}
          </div>

          {register?.descriptions && (
            <Descriptions
              descriptions={register.descriptions}
              isGroup={register?.isDescriptionsGroup}
            />
          )}

          {register?.quest && <Quest quests={register.quest} />}

          {register?.location && <Location location={register.location} />}

          {register?.timer && (
            <TimerInfo timer={register.timer} monsterName={monsterName} />
          )}

          {register?.boss && <Boss boss={register.boss} />}
        </div>
      ))}
    </>
  );
}
