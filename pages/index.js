import React from 'react';
import { nanoid } from 'nanoid';
import Audio from '../components/audio';
import Snippet from '../components/snippet';
import ImageToCanvas from '../components/image-to-canvas';
import InputAudio from '../components/input-audio';
import InputImage from '../components/input-image';
import axios from 'axios';

export default function Home() {
  const [audioFile, setAudioFile] = React.useState(null);
  const [audioFileName, setAudioFileName] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [currentAudioTime, setCurrentAudioTime] = React.useState();
  const [initStartTime, setInitStartTime] = React.useState();
  const [fileAudioEndTime, setFileAudioEndTime] = React.useState();
  const [audioSnips, setAudioSnips] = React.useState([]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [isFileUploading, setIsFileUploading] = React.useState(false);

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFileName(file.name);
    const url = URL.createObjectURL(file);
    localStorage.setItem('url', url);
    setAudioFile(url);
    sendAudioToServer(file);
  };

  const sendAudioToServer = async (file) => {
    const data = new FormData();
    data.append('file', file, file.name);
    setIsFileUploading(true);
    await axios
      .post('http://localhost:3001/file', data, {
        onUploadProgress: (ProgressEvent) => {
          console.log('## ProgressEvent: ', ProgressEvent.progress * 100);
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setIsFileUploading(false);
        }
      })
      .catch(() => setIsFileUploading(false));
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
    setIsRecording(true);
    setInitStartTime(currentAudioTime);
  };
  const handleOnMouseUp = () => {
    setIsRecording(false);
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
          isSnippetCreated: true,
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
      body: JSON.stringify({ audioFileName, snips: audioSnips }),
    })
      .then(() => console.log('## call done!'))
      .catch(() => console.log('## something flopped'));
  };

  const handleToSnipAPI = async (snipId) => {
    const selectedSnip = audioSnips.filter((snip) => snip.id === snipId);
    console.log('## selectedSnip: ', selectedSnip);
    await fetch('http://localhost:3001/snippet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ audioFileName, snips: selectedSnip }),
    })
      .then(() => {
        const updatedSnips = audioSnips.map((snip) => {
          if (snip.id === snipId) {
            return {
              ...snip,
              createdInAnki: true,
            };
          }
          return snip;
        });
        setAudioSnips(updatedSnips);
      })
      .catch(() => console.log('## something flopped'));
  };

  const handleMinusTimeChange = ({ id, newStartTime }) => {
    const findSnippnet = audioSnips.map((snip) => {
      if (snip.id === id) {
        return {
          ...snip,
          startTime: newStartTime,
        };
      }
      return snip;
    });
    setAudioSnips(findSnippnet);
  };
  const handlePlusTimeChange = ({ id, newEndTime }) => {
    const findSnippnet = audioSnips.map((snip) => {
      if (snip.id === id) {
        return {
          ...snip,
          endTime: newEndTime,
        };
      }
      return snip;
    });
    setAudioSnips(findSnippnet);
  };

  const deleteSnippet = (id) => {
    const filterOutSnippet = audioSnips.filter((snip) => id !== snip.id);
    setAudioSnips(filterOutSnippet);
  };

  const handleAudioEndTime = (duration) => {
    setFileAudioEndTime(duration);
  };

  const disableRecordButton = !currentAudioTime;

  return (
    <div>
      <h1>Anki card maker</h1>
      <div>
        <InputAudio handleAudioFileChange={handleAudioFileChange} />
        <InputImage handleImageFileChange={handleImageFileChange} />
        {audioFile && isFileUploading ? <p>file uploading ...</p> : null}
        <div>
          {audioFile ? (
            <Audio
              audioFile={audioFile}
              handleTimeUpdate={handleTimeUpdate}
              handleAudioEndTime={handleAudioEndTime}
              fileAudioEndTime={fileAudioEndTime}
            />
          ) : null}
        </div>
        <button onClick={handleToJsonFile}>Write to json file</button>
        <div>
          <button
            style={{ background: isRecording ? 'red' : '' }}
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
                    handleMinusTimeChange={handleMinusTimeChange}
                    handlePlusTimeChange={handlePlusTimeChange}
                    isSnippetCreated={audioSnip?.isSnippetCreated}
                    fileAudioEndTime={fileAudioEndTime}
                    deleteSnippet={deleteSnippet}
                    handleToSnipAPI={handleToSnipAPI}
                    createdInAnki={audioSnip?.createdInAnki}
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
