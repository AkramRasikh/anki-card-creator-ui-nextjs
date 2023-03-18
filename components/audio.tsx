import React from 'react';
import styles from '../styles/Home.module.css';

const Audio = ({
  handleTimeUpdate,
  handleAudioEndTime,
  fileAudioEndTime,
  audioFile,
  startTime,
  endTime,
}) => {
  const snippet = startTime || endTime;

  const audioRef = React.useRef(null);
  const sourceRef = React.useRef(null);

  const internalHandleTimeUpdate = (evt) => {
    const { currentTime } = evt.target;
    const [realstartTime, realEndtime] = sourceRef.current.src
      .split('#')[1]
      .split(',');

    const finalRealStartTime = realstartTime.replace('t=', '');

    const currentTimeIsBeforeStartTime = currentTime < finalRealStartTime;
    const currentTimeIsAfterEndTime = currentTime > realEndtime;

    if (currentTimeIsBeforeStartTime) {
      audioRef.current.pause();
      audioRef.current.currentTime = finalRealStartTime;
    } else if (currentTimeIsAfterEndTime) {
      audioRef.current.pause();
      audioRef.current.currentTime = realEndtime;
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

  React.useEffect(() => {
    if (audioRef?.current?.duration && !snippet && !fileAudioEndTime) {
      handleAudioEndTime(audioRef.current.duration);
    }
  }, [audioRef]);

  const source = !snippet
    ? audioFile
    : audioFile + `#t=${startTime},${endTime}`;

  return (
    <div>
      <audio controls className={styles.audioOriginal} ref={audioRef}>
        <source ref={sourceRef} src={source} type='audio/mpeg' />
      </audio>
    </div>
  );
};

export default Audio;
