import styles from './css/Notice.module.css';
import CheckIcon from './icons/CheckIcon';
import ChevronIcon from './icons/ChevronIcon';
import ExclamationIcon from './icons/ExclamationIcon';

const notice = [
  {
    id: 'note',
    icon: <ExclamationIcon />,
    title: 'Note',
  },
  {
    id: 'tip',
    icon: <CheckIcon />,
    title: 'Tip',
  },
];

type Props = {
  type: 'note' | 'tip';
  textList: string[];
};

export default function Notice({ type, textList }: Props) {
  return (
    <div className={styles.notice}>
      {notice.map(
        ({ id, icon, title }) =>
          id === type && (
            <div
              key={id}
              className={`${styles.top} ${styles[getNoticeStyle(type)]}`}
            >
              <span>{icon}</span>
              <h4 className={styles.title}>{title}</h4>
            </div>
          )
      )}
      <div className={`${styles.message} ${styles[getNoticeStyle(type)]}`}>
        {textList.map((text, index) => (
          <div className={styles.container} key={index}>
            <span className={styles.icon}>
              <ChevronIcon />
            </span>
            <p className={styles.text}>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getNoticeStyle(type: string) {
  return type === 'note' ? 'blue' : 'green';
}
