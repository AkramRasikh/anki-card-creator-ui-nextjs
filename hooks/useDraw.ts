import React from 'react';

const useDraw = (canvasId) => {
  const [canvas, setCanvas] = React.useState(null);

  let coord = { x: 0, y: 0 };

  const getMousePos = (evt) => {
    const rect = canvas.getBoundingClientRect();
    coord.x = evt.clientX - rect.left;
    coord.y = evt.clientY - rect.top;
  };

  const start = (evt) => {
    document.addEventListener('mousemove', draw);
    document.addEventListener('mouseup', stop);
    reposition(evt);
  };

  const draw = (drawEvt) => {
    const ctx = canvas?.getContext('2d');
    getMousePos(drawEvt);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#ACD3ED';
    ctx.moveTo(coord.x, coord.y);
    reposition(drawEvt);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
  };

  const stop = () => {
    document.removeEventListener('mousemove', draw);
  };

  const reposition = (event) => {
    getMousePos(event);
  };

  React.useEffect(() => {
    const canvasEl = document?.getElementById(`myCanvas${canvasId}`);
    setCanvas(canvasEl);
    return () => {
      document.removeEventListener('mousemove', draw);
      document.removeEventListener('mouseup', stop);
    };
  }, []);

  return start;
};

export default useDraw;
