import { Register } from '@/model/information';
import Label from './Label';
import Descriptions from './Descriptions';
import styles from './css/Registration.module.css';
import Quest from './Quest';

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

          <div>
            {register?.location?.main}
            {register?.location?.sub}
          </div>
          <div>{register?.timer}</div>
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
