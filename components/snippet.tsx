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
}: any) => {
  const downloadSnippet = () => {
    const canvasId = `myCanvas${id}`;
    const imageToBase64 = document
      .getElementById(canvasId)
      .toDataURL('image/png');
    console.log('## imageToBase64: ', imageToBase64);

    handleSnippetImage({ id, image: imageToBase64 });
  };

  return (
    <div style={{ border: '1px solid' }}>
      <div style={{ display: 'flex' }}>
        <Audio audioFile={audioFile} startTime={startTime} endTime={endTime} />
        <ImageToCanvas imageFile={imageFile} imageId={id} />
        <div>
          <button onClick={downloadSnippet}>download</button>
        </div>
      </div>
      <div>
        <h1>yoo here</h1>
      </div>
    </div>
  );
};

export default Snippet;
