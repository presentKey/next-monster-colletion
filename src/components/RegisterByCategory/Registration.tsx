import { Register } from '@/model/information';
import Label from './Label';
import Descriptions from './Descriptions';
import styles from './css/Registration.module.css';
import Quest from './Quest';
import Location from './Location';
import TimerInfo from './TimerInfo';

type Props = {
  registers: Register[];
};

export default function Registration({ registers }: Props) {
  return (
    <>
      {registers.map((register, index) => (
        <div className={styles.container} key={index}>
          <span>{register?.tag?.id}</span>

          <div className={styles.labels}>
            {register?.job && <Label text={register.job} />}
            {register?.tag?.name && <Label text={register?.tag?.name} />}
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

          <div>
            {register?.boss?.name}
            {register?.boss?.difficulty}
            {register?.boss?.description}
          </div>
        </div>
      ))}
    </>
  );
}
