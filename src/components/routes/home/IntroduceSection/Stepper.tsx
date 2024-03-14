import { useEffect, useRef } from 'react';
import styles from './css/Stepper.module.css';

type Props = {
  stopNumber: number;
};

export default function Stepper({ stopNumber }: Props) {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const stepperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stepperEl = stepperRef.current;
    if (!stepperEl) return;

    stepperEl.style.top = `-${stepperEl.offsetHeight * stopNumber}px`;
    stepperEl.style.transitionDelay = `${100 * (10 - stopNumber)}`;
    stepperEl.style.transitionTimingFunction =
      stopNumber >= 4 ? 'cubic-bezier(.12,.74,.46,1)' : 'ease-in-out';
  }, [stopNumber]);

  return (
    <div className={styles.stepper} ref={stepperRef}>
      {numbers.map((number) => (
        <span className={styles['stepper-value']} key={number}>
          {number}
        </span>
      ))}
    </div>
  );
}
