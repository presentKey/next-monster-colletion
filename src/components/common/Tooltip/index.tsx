import { ITooltip, Tooltip as ReactTooltip } from 'react-tooltip';
import styles from './css/index.module.css';

export default function Tooltip({ ...options }: ITooltip) {
  return <ReactTooltip {...options} className={`${styles.tooltip}`} />;
}
