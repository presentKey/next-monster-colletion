'use client';
import BackgroundOverlay from '@/components/common/BackgroundOverlay/BackgroundOverlay';
import styles from './css/TimerBar.module.css';
import useTimerBar from '@/recoil/TimerBar/useTimerBar';
import CloseIcon from '@/components/common/icons/CloseIcon';

export default function TimerBar() {
  const { open, toggleTimerBar } = useTimerBar();

  return (
    <>
      <aside className={`${styles.timerbar} ${open && styles['is-open']}`}>
        <header className={styles.header}>
          <h3>타이머</h3>
          <button
            className={styles.close}
            type='button'
            onClick={toggleTimerBar}
          >
            <CloseIcon />
          </button>
        </header>
      </aside>
      {open && <BackgroundOverlay onClose={toggleTimerBar} />}
    </>
  );
}
