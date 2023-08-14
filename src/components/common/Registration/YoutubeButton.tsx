'use client';
import { useState } from 'react';
import styles from './css/YoutubeButton.module.css';
import useYoutube from '@/recoil/Youtube/useYoutube';

type Props = {
  youtube: string;
};

export default function YoutubeButton({ youtube }: Props) {
  const [open, setOpen] = useState(false);
  const { handleYoutubeToggle } = useYoutube();
  const handleClick = () => {
    setOpen((prev) => !prev);
    handleYoutubeToggle();
  };

  return (
    <section className={styles.youtube}>
      <button className={styles.button} type='button' onClick={handleClick}>
        YouTube
      </button>
      {open && (
        <div className={styles.video}>
          <div className={styles['video-ratio']}>
            <iframe
              className={styles.iframe}
              id='player'
              width='640'
              height='360'
              src={`http://www.youtube.com/embed/${youtube}`}
            />
          </div>
        </div>
      )}
    </section>
  );
}
