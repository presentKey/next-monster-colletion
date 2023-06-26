'use client';
import { CategoryDetailInformation } from '@/model/category';
import styles from './css/RegisterByCategory.module.css';
import { dohyeon } from '@/utils/fonts';

type Props = {
  detail: CategoryDetailInformation;
};

export default function RegisterByCategory({ detail }: Props) {
  return (
    <article className={styles.information}>
      {detail.subCategory.map((sub) => (
        <>
          <h2
            className={`${styles['sub-title']} ${dohyeon.className}`}
            key={sub.title}
          >
            {sub.title}
          </h2>
          {sub.information.map((info, index) => (
            <div key={index}>
              {info.monsters.map((monster, index) => (
                <span key={index}>{monster.name}</span>
              ))}
              {info.registers.map((register, index) => (
                <span key={index}>{register.tag}</span>
              ))}
            </div>
          ))}
        </>
      ))}
    </article>
  );
}
