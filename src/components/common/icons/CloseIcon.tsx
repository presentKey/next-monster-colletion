import { IoMdClose } from 'react-icons/io';
import styles from './css/CloseIcon.module.css';

type Props = {
  size?: 'small';
};

export default function CloseIcon({ size }: Props) {
  return (
    <IoMdClose
      className={`${styles.icon} ${size === 'small' && styles.small}`}
    />
  );
}
