'use client';
import { useEffect, useState } from 'react';
import Stepper from './Stepper';
import styles from './css/Odometer.module.css';

type Props = {
  number: number;
};

export default function Odometer({ number }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const numberArr = number.toString().split('');

  useEffect(() => setIsLoading(false), []);

  return (
    <div className={`${styles.odometer} ${isLoading && styles['is-loading']}`}>
      {isLoading && '?'}

      {!isLoading &&
        numberArr.map((number, index) => (
          <Stepper key={index} stopNumber={Number(number)} />
        ))}
    </div>
  );
}
