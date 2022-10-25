import React from 'react';
import styles from '../styles/Home.module.css';

const Audio = ({ handleTimeUpdate, audioFile, startTime, endTime }) => {
  const snippet = startTime || endTime;

  const audioRef = React.useRef(null);

  const internalHandleTimeUpdate = (evt) => {
    const { currentTime } = evt.target;
    const currentTimeIsBeforeStartTime = currentTime < startTime;
    const currentTimeIsAfterEndTime = currentTime > endTime;

    if (currentTimeIsBeforeStartTime) {
      audioRef.current.pause();
      audioRef.current.currentTime = startTime;
    } else if (currentTimeIsAfterEndTime) {
      audioRef.current.pause();
      audioRef.current.currentTime = endTime;
    }
  };

  const finalHandleTimeUpdate = (evt) => {
    handleTimeUpdate(evt);
  };

  React.useEffect(() => {
    const el = audioRef.current;
    if (!snippet) {
      el.addEventListener('timeupdate', finalHandleTimeUpdate);
    } else {
      el.addEventListener('timeupdate', internalHandleTimeUpdate);
    }

    return () => {
      if (!snippet) {
        el.removeEventListener('timeupdate', finalHandleTimeUpdate);
      } else {
        el.removeEventListener('timeupdate', internalHandleTimeUpdate);
      }
    };
  }, []);

  const source = !snippet
    ? audioFile
    : audioFile + `#t=${startTime},${endTime}`;

  return (
    <audio controls className={styles.audioOriginal} ref={audioRef}>
      <source src={source} type='audio/mpeg' />
    </audio>
  );
};

export default Audio;
