'use client';
import { useState } from 'react';
import styles from './css/YoutubeButton.module.css';

type Props = {
  youtube: string;
};

export default function YoutubeButton({ youtube }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button
        className={styles.button}
        type='button'
        onClick={() => setOpen((prev) => !prev)}
      >
        YouTube
      </button>
      {open && (
        <iframe
          className={styles.iframe}
          id='player'
          width='640'
          height='360'
          src={`http://www.youtube.com/embed/${youtube}`}
        ></iframe>
      )}
    </section>
  );
}
