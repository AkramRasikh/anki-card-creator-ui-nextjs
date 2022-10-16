import React from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [audioFile, setAudioFile] = React.useState(null);

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    localStorage.setItem('thisAudio', url);
    setAudioFile(url);
  };

  return (
    <div className={styles.container}>
      <h1>Hello</h1>
      <div>
        <label for='avatar'>Choose an audio file:</label>

        <input
          type='file'
          id='audio'
          name='audio'
          accept='audio/mp3'
          onChange={handleAudioFileChange}
        />

        <div>
          <audio controls>
            <source id='audio-source' src={audioFile} type='audio/mpeg' />
          </audio>
        </div>
      </div>
    </div>
  );
}
