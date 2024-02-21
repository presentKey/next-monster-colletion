import styles from './css/TocItem.module.css';

type Props = {
  index: number;
  active: number;
  title: string;
  onClick: () => void;
};

export default function TocItem({ index, active, title, onClick }: Props) {
  return (
    <li
      className={`toc-item ${styles.item} ${
        index === active && styles['is-active']
      }`}
      role='tab'
      aria-labelledby={title}
      onClick={onClick}
    >
      {title}
    </li>
  );
}
