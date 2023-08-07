'use client';
import BackgroundOverlay from '@/components/common/BackgroundOverlay/BackgroundOverlay';
import styles from './css/TimerBar.module.css';
import useTimerBar from '@/recoil/TimerBar/useTimerBar';
import CloseIcon from '@/components/common/icons/CloseIcon';
import useTimerList from '@/recoil/TimerBar/useTimerList';
import Timer from './Timer';
import TimerIcon from '@/components/common/icons/TimerIcon';
import Badge from '@/components/common/Badge/Badge';

export default function TimerBar() {
  const { open, toggleTimerBar } = useTimerBar();
  const { timers } = useTimerList();

  return (
    <>
      {timers.length > 0 && (
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

          <ul className={styles.list}>
            {timers.map((timer) => (
              <Timer key={timer.monsterName} timer={timer} />
            ))}
          </ul>

          <div
            className={`sm-hidden ${styles['icon-warp']} ${
              open && styles.hidden
            }`}
            onClick={toggleTimerBar}
          >
            <TimerIcon />
            <Badge position='desktop' />
          </div>
        </aside>
      )}
      {open && timers.length > 0 && (
        <BackgroundOverlay onClose={toggleTimerBar} />
      )}
    </>
  );
}
