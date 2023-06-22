import SunIcon from './icons/SunIcon';
import { useDarkMode } from '@/context/DarkModeContext';
import MoonIcon from './icons/MoonIcon';
import styles from './css/ThemeButton.module.css';

export default function ThemeButton() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button className={styles.button} type='button' onClick={toggleDarkMode}>
      <div className={styles.indicator}>
        <div className={styles.container}>
          {darkMode && <MoonIcon />}
          {!darkMode && <SunIcon />}
        </div>
      </div>
    </button>
  );
}
