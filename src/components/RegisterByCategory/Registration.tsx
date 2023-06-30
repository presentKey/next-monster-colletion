import { LabelTag, Register } from '@/model/information';
import Label from './Label';
import Descriptions from './Descriptions';
import styles from './css/Registration.module.css';
import Quest from './Quest';
import Location from './Location';
import TimerInfo from './TimerInfo';
import Boss from './Boss';

type Props = {
  registers: Register[];
};

const labelTags = ['PQ', 'B', 'O', 'TD', 'M'];

export default function Registration({ registers }: Props) {
  return (
    <>
      {registers.map((register, index) => (
        <div className={styles.container} key={index}>
          <div className={styles.labels}>
            {register?.job && <Label text={register.job} />}
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

          {register?.timer && <TimerInfo timer={register.timer} />}

          {register?.boss && <Boss boss={register.boss} />}
        </div>
      ))}
    </>
  );
}
