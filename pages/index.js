import React from 'react';
import { nanoid } from 'nanoid';
import Audio from '../components/audio';
import Snippet from '../components/snippet';
import ImageToCanvas from '../components/image-to-canvas';
import InputAudio from '../components/input-audio';
import InputImage from '../components/input-image';

export default function Home() {
  const [audioFile, setAudioFile] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [currentAudioTime, setCurrentAudioTime] = React.useState();
  const [initStartTime, setInitStartTime] = React.useState();
  const [audioSnips, setAudioSnips] = React.useState([]);

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

  const handleTimeUpdate = (evt) => {
    setCurrentAudioTime(evt.target.currentTime);
  };

  const handleOnMouseDown = () => {
    setInitStartTime(currentAudioTime);
  };
  const handleOnMouseUp = () => {
    setAudioSnips([
      { id: nanoid(), startTime: initStartTime, endTime: currentAudioTime },
      ...audioSnips,
    ]);
    setInitStartTime(0);
  };

  const handleSnippetImage = ({ id, image }) => {
    const findSnippnet = audioSnips.map((snip) => {
      if (snip.id === id) {
        return {
          ...snip,
          image,
        };
      }
      return snip;
    });
    setAudioSnips(findSnippnet);
  };

  const handleToJsonFile = async () => {
    await fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ snips: audioSnips }),
    })
      .then(() => console.log('## call done!'))
      .catch(() => console.log('## something flopped'));
  };

  const disableRecordButton = !currentAudioTime;

  return (
    <div>
      <h1>Anki card maker</h1>
      <div>
        <InputAudio handleAudioFileChange={handleAudioFileChange} />
        <InputImage handleImageFileChange={handleImageFileChange} />
        <div>
          {audioFile ? (
            <Audio audioFile={audioFile} handleTimeUpdate={handleTimeUpdate} />
          ) : null}
        </div>
        <button onClick={handleToJsonFile}>Write to json file</button>
        <div>
          <button
            onMouseDown={handleOnMouseDown}
            onMouseUp={handleOnMouseUp}
            disabled={disableRecordButton}
          >
            Press & hold
          </button>
        </div>
        <div>
          {imageFile ? (
            <ImageToCanvas imageFile={imageFile} imageId='1' master />
          ) : null}
        </div>
        {audioSnips?.length > 0 ? (
          <div>
            <ul>
              {audioSnips.map((audioSnip) => (
                <li key={audioSnip.id}>
                  <Snippet
                    id={audioSnip.id}
                    audioFile={audioFile}
                    startTime={audioSnip.startTime}
                    endTime={audioSnip.endTime}
                    imageFile={imageFile}
                    handleSnippetImage={handleSnippetImage}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
