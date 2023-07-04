import { Location } from '@/model/information';
import styles from './css/Location.module.css';
import Label from './Label';
import LocationIcon from '@/components/icons/LocationIcon';

type Props = {
  location: Location;
};

export default function Location({ location }: Props) {
  return (
    <div className={styles.location}>
      <div className={styles.icon}>
        <LocationIcon />
      </div>
      <p className={styles.container}>
        <span>{location?.main}</span>
        {location?.sub && <span className={styles.sub}>{location.sub}</span>}
      </p>
      <Label text='위치 복사' size='small' color='blue' />
    </div>
  );
}
