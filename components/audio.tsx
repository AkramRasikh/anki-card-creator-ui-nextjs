import React from 'react';
import styles from '../styles/Home.module.css';

const Audio = ({ handleTimeUpdate, audioFile, startTime, endTime }) => {
  const audioRef = React.useRef(null);
  const snippet = startTime || endTime;
  React.useEffect(() => {
    const el = audioRef.current;
    if (!snippet) {
      el.addEventListener('timeupdate', handleTimeUpdate);
    }
  }, []);

  const source = !snippet
    ? audioFile
    : audioFile + `#t=${startTime},${endTime}`; // snippet text

  return (
    <audio controls className={styles.audioOriginal} ref={audioRef}>
      <source src={source} type='audio/mpeg' />
    </audio>
  );
};

export default Audio;
