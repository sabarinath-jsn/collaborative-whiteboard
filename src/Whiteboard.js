import React, { useRef, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Ensure the server URL matches

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [current, setCurrent] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('#000000'); // Default color for drawing is black
  const [tool, setTool] = useState('pen'); // Tool can be 'pen' or 'eraser'

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Handle incoming drawing data from other users
    socket.on('drawing', onDrawingEvent);

    return () => {
      socket.off('drawing', onDrawingEvent);
    };
  }, []);

  const onDrawingEvent = (data) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawLine(context, data.x0, data.y0, data.x1, data.y1, data.color, false);
  };

  const drawLine = (context, x0, y0, x1, y1, color, emit) => {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = color === 'white' ? 10 : 2; // Make the eraser thicker
    context.stroke();
    context.closePath();

    if (!emit) return;

    // Emit drawing data to other users
    socket.emit('drawing', { x0, y0, x1, y1, color });
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    setCurrent({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;

    drawLine(context, current.x, current.y, newX, newY, tool === 'eraser' ? 'white' : color, true);
    setCurrent({ x: newX, y: newY });
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setTool('pen')}>Pen</button>
        <button onClick={() => setTool('eraser')}>Eraser</button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={tool === 'eraser'} // Disable color picker when eraser is selected
          style={{ marginLeft: '10px' }}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ border: '1px solid #000', marginTop: '20px', cursor: tool === 'eraser' ? 'crosshair' : 'pointer' }}
      />
    </div>
  );
};

export default Whiteboard;
