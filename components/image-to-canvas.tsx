import React from 'react';
import useDraw from '../hooks/useDraw';

const ImageToCanvas = ({ imageFile, imageId, master }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const canvasRef = React.useRef();
  const imageRef = React.useRef();

  if (master) {
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
          />
        </div>
      </div>
    );
  }

  const start = useDraw(imageId);

  const canvasCreation = ({ imageRef, image }) => {
    const canvas = document.getElementById(`myCanvas${imageId}`);
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const imageHeight = imageRef.current.height * 0.5;
      const imageWidth = imageRef.current.width * 0.5;
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
      document.addEventListener('mousedown', start);
    }
  };

  React.useEffect(() => {
    const image = document?.getElementById(imageId);
    if (imageLoaded) {
      image.style.display = 'none';
      canvasCreation({ imageRef, image });
    }
    if (image && !imageLoaded) {
      image.onload = function () {
        setImageLoaded(true);
      };
    }

    return () => {
      document.removeEventListener('mousedown', start);
    };
  }, [imageFile, imageRef, canvasRef, imageLoaded]);

  return (
    <div>
      <img id={imageId} ref={imageRef} src={imageFile} />
      <div
        style={{
          border: '1px solid',
          width: 'fit-content',
          margin: 'auto',
        }}
      >
        <canvas ref={canvasRef} id={`myCanvas${imageId}`} />
      </div>
    </div>
  );
};

export default ImageToCanvas;
