import React from 'react';
import Audio from './audio';
import ImageToCanvas from './image-to-canvas';

const Snippet = ({ audioFile, startTime, endTime, imageFile, id }: any) => {
  const downloadSnippet = () => {
    console.log('## downloadSnippet');
    const canvasId = `myCanvas${id}`;
    const canvasEl = document.getElementById(canvasId).toDataURL('image/png');
    console.log('## canvasEl: ', canvasEl);
    const imageEl = document.getElementById(`image-base${id}`);
    imageEl?.setAttribute('src', canvasEl);
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Audio audioFile={audioFile} startTime={startTime} endTime={endTime} />
        <ImageToCanvas imageFile={imageFile} imageId={id} />
        <div>
          <button onClick={downloadSnippet}>download</button>
        </div>
      </div>
      <div>
        <h1>yoo here</h1>
        <img id={`image-base${id}`} />
      </div>
    </div>
  );
};

export default Snippet;
