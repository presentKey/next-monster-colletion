import styles from './css/Notice.module.css';
import CheckIcon from './icons/CheckIcon';
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
  text: string;
};

export default function Notice({ type, text }: Props) {
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
      <p className={`${styles.message} ${styles[getNoticeStyle(type)]}`}>
        {text}
      </p>
    </div>
  );
}

function getNoticeStyle(type: string) {
  return type === 'note' ? 'blue' : 'green';
}
