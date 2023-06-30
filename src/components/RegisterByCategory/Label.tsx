import { LabelTag } from '@/model/information';
import styles from './css/Label.module.css';

type Props = {
  text: string;
  id?: LabelTag;
  size?: 'small' | 'normal';
  color?: 'green-dark' | 'green' | 'yellow' | 'blue';
};

export default function Label({
  text,
  id,
  size = 'normal',
  color = 'green',
}: Props) {
  return (
    <div
      className={`${styles.label} 
        ${size === 'small' && styles.small} 
        ${color && styles[getColorStyle(color)]}
  
      `}
    >
      {id ? setMessage(id, text) : text}
    </div>
  );
}

function setMessage(id: LabelTag, text: string) {
  switch (id) {
    case 'O':
      return text;
    case 'B':
      return 'BOSS';
    case 'M':
      return `${`몬스터파크: ${text}`}`;
    case 'PQ':
      return `${`파티퀘스트: ${text}`}`;
    case 'TD':
      return `${`테마던전: ${text}`}`;
  }
}

function getColorStyle(color: string) {
  switch (color) {
    case 'yellow':
      return 'yellow';
    case 'blue':
      return 'blue';
    case 'green-dark':
      return 'green-dark';
    default:
      return 'green';
  }
}
