import React from 'react';
import ConditionalWrapper from '../utils/conditional-wrapper';
import Audio from './audio';
import ImageToCanvas from './image-to-canvas';
import SnippetCreatedOverlay from './snippet-created-overlay';

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
    // <ConditionalWrapper
    //   wrapper={(children) => (
    //     <SnippetCreatedOverlay>{children}</SnippetCreatedOverlay>
    //   )}
    //   condition={createdInAnki}
    // >
    <div style={{ border: '1px solid' }}>
      <div>
        <div style={{ display: 'inline-flex', margin: '10px' }}>
          <p>
            Audio references (from {startTime?.toFixed(2)} to{' '}
            {endTime?.toFixed(2)})
          </p>
          <button onClick={handleDelete}>X</button>
        </div>
        <Audio audioFile={audioFile} startTime={startTime} endTime={endTime} />
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
    // </ConditionalWrapper>
  );
};

export default Snippet;
