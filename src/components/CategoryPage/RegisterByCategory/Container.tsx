'use client';

import { timerListLength } from '@/recoil/TimerBar/selectors';
import { useRecoilValue } from 'recoil';
import styles from './css/Container.module.css';

type Props = {
  children: React.ReactNode;
};
export default function Container({ children }: Props) {
  const timerLength = useRecoilValue(timerListLength);

  return (
    <div
      className={`${styles.container} ${
        timerLength > 0 && styles['timerbar-open']
      }`}
    >
      {children}
    </div>
  );
}
