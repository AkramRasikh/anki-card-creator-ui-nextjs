import React from 'react';
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

  return (
    <div style={{ border: '1px solid' }}>
      <div>
        <p>
          Audio references (from {startTime?.toFixed(2)} to{' '}
          {endTime?.toFixed(2)})
        </p>
        <Audio audioFile={audioFile} startTime={startTime} endTime={endTime} />
        <div>
          <button onClick={handleRewind}>rewind -0.5</button>
          <button onClick={handleForward}>forward +0.5</button>
        </div>
        <ImageToCanvas imageFile={imageFile} imageId={id} />
        <div>
          <button onClick={downloadSnippet}>create snippet</button>
          {isSnippetCreated ? <span>snippet created!</span> : null}
        </div>
      </div>
    </div>
  );
};

export default Snippet;
