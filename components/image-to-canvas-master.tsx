import React from 'react';

const ImageToCanvasMaster = ({ imageFile, imageId }) => {
  const imageRef = React.useRef();

  return (
    <div>
      <div
        style={{
          width: 'fit-content',
          margin: 'auto',
        }}
      >
        <img
          id={imageId}
          ref={imageRef}
          src={imageFile}
          style={{ border: '1px solid', width: '80%' }}
          alt='master-image'
        />
      </div>
    </div>
  );
};

export default ImageToCanvasMaster;
