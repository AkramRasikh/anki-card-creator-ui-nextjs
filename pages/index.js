import React from 'react';
import { nanoid } from 'nanoid';
import Audio from '../components/audio';

export default function Home() {
  const [audioFile, setAudioFile] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [currentAudioTime, setCurrentAudioTime] = React.useState();
  const [initStartTime, setInitStartTime] = React.useState();
  const [audioSnips, setAudioSnips] = React.useState([]);

  const canvasRef = React.useRef();
  const imageRef = React.useRef();

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    localStorage.setItem('url', url);
    setAudioFile(url);
  };
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImageFile(url);
  };

  React.useEffect(() => {
    const condition = !!(imageFile && imageRef?.current?.height);
    if (condition) {
      const canvas = document.getElementById('myCanvas');
      const image = document.getElementById('initImage');
      image.style.display = 'none';
      const ctx = canvas.getContext('2d');
      const imageHeight = imageRef.current.height;
      const imageWidth = imageRef.current.width;

      canvas.width = imageWidth;
      canvas.height = imageHeight;
      ctx.drawImage(image, 0, 0);
    }
  }, [imageFile, imageRef]);

  const handleTimeUpdate = (evt) => {
    setCurrentAudioTime(evt.target.currentTime);
  };

  const handleOnMouseDown = () => {
    setInitStartTime(currentAudioTime);
  };
  const handleOnMouseUp = () => {
    setAudioSnips([
      ...audioSnips,
      { id: nanoid(), startTime: initStartTime, endTime: currentAudioTime },
    ]);
    setInitStartTime(0);
  };

  const disableRecordButton = !currentAudioTime;

  return (
    <div>
      <h1>Anki card maker</h1>
      <div>
        <div>
          <label htmlFor='audio'>Choose an audio file:</label>
          <input
            type='file'
            id='audio'
            name='audio'
            accept='audio/mp3'
            onChange={handleAudioFileChange}
          />
        </div>
        <div>
          {audioFile ? (
            <Audio audioFile={audioFile} handleTimeUpdate={handleTimeUpdate} />
          ) : null}
        </div>
        <div>
          <button
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            disabled={disableRecordButton}
          >
            Press & hold
          </button>
        </div>
        {audioSnips?.length > 0 ? (
          <div>
            <ul>
              {audioSnips.map((audioSnip) => (
                <li key={audioSnip.id}>
                  <Audio
                    audioFile={audioFile}
                    startTime={audioSnip.startTime}
                    endTime={audioSnip.endTime}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div>
        <label htmlFor='image'>Choose an image file:</label>
        <input
          type='file'
          id='image'
          name='image'
          accept='image/*'
          onChange={handleImageFileChange}
        />
        {imageFile ? (
          <div>
            <img id='initImage' ref={imageRef} src={imageFile} />
          </div>
        ) : null}
        <div>
          <canvas ref={canvasRef} id='myCanvas' />
        </div>
      </div>
    </div>
  );
}
