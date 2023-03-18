import React from 'react';
import { secondsToMinutes } from '../utils/seconds-to-minutes';
import Audio from './audio';
import ImageToCanvas from './image-to-canvas';

const Snippet = ({
  audioFile,
  startTime,
  endTime,
  imageFile,
  id,
  handleSnippetImage,
  isSnippetCreated,
  handleMinusTimeChange,
  handlePlusTimeChange,
  fileAudioEndTime,
  deleteSnippet,
  handleToSnipAPI,
  createdInAnki,
  numberOrder,
}: any) => {
  const downloadSnippet = () => {
    const canvasId = `myCanvas${id}`;
    const imageToBase64 = document
      .getElementById(canvasId)
      .toDataURL('image/png');
    handleSnippetImage({ id, image: imageToBase64 });
  };

  const handleRewind = () => {
    const newStartTime = startTime - 0.5;
    if (newStartTime < 0) {
      return;
    }
    handleMinusTimeChange({ id, newStartTime });
  };
  const handleForward = () => {
    const newEndTime = endTime + 0.5;
    if (newEndTime > fileAudioEndTime) {
      return;
    }
    handlePlusTimeChange({ id, newEndTime });
  };

  const handleDelete = () => {
    deleteSnippet(id);
  };

  const handleCreateSnipAPI = () => {
    handleToSnipAPI(id);
  };

  return (
    <div
      style={{
        border: '1px solid',
        marginBottom: '10px',
        padding: '10px',
        position: 'relative',
      }}
    >
      {Number.isInteger(numberOrder) && (
        <span style={{ position: 'absolute', left: '0', margin: '10px' }}>
          # {numberOrder}
        </span>
      )}
      <div>
        <div>
          <div style={{ display: 'inline-flex', margin: '10px' }}>
            <p>
              from {secondsToMinutes(startTime)} to {secondsToMinutes(endTime)}
            </p>
            <button
              onClick={handleDelete}
              style={{
                border: 'none',
                borderRadius: '10px',
                padding: '8px',
                margin: 'auto 10px',
              }}
            >
              X
            </button>
          </div>
          <Audio
            audioFile={audioFile}
            startTime={startTime}
            endTime={endTime}
          />
        </div>
        <div>
          <button onClick={handleRewind} disabled={isSnippetCreated}>
            rewind -0.5
          </button>
          <button onClick={handleForward} disabled={isSnippetCreated}>
            forward +0.5
          </button>
        </div>
        <ImageToCanvas imageFile={imageFile} imageId={id} />
        <div>
          {isSnippetCreated ? (
            <span>snippet created!</span>
          ) : (
            <button onClick={downloadSnippet}>create snippet</button>
          )}
          <div>
            {isSnippetCreated && !createdInAnki ? (
              <button onClick={handleCreateSnipAPI}>API call</button>
            ) : createdInAnki ? (
              <span>Snippet in anki!</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
