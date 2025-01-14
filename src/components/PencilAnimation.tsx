"use client";

import React, { useEffect, useRef } from 'react';
import rough from 'roughjs/bin/rough';

const PencilAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const roughCanvas = rough.canvas(canvas);

    const drawPencil = (x: number, y: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the eraser
      roughCanvas.rectangle(x, y, 20, 10, { fill: 'pink' });

      // Draw the metal part
      roughCanvas.rectangle(x + 20, y, 10, 10, { fill: 'gray' });

      // Draw the wooden part
      roughCanvas.rectangle(x + 30, y, 50, 10, { fill: 'yellow' });

      // Draw the graphite tip
      roughCanvas.polygon([
        [x + 80, y],
        [x + 90, y + 5],
        [x + 80, y + 10],
      ], { fill: 'black' });
    };

    let x = 0;
    const y = canvas.height / 2 - 5;

    const animate = () => {
      drawPencil(x, y);
      x += 1; // Adjust the speed by changing this value
      if (x > canvas.width) {
        x = -90; // Reset position to start again from the left
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex justify-center items-center mt-8" style={{ width: '400px', height: '100px' }}>
      <canvas ref={canvasRef} width={400} height={100} />
    </div>
  );
};

export default PencilAnimation;