"use client";

import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs/bin/rough';

const NotebookBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const roughCanvas = rough.canvas(canvas);

    const drawNotebookLines = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Draw blue horizontal lines with increased spacing
      for (let y = 60; y < height; y += 60) {
        roughCanvas.line(0, y, width, y, { stroke: 'blue' });
      }

      // Draw red vertical line on the left
      roughCanvas.line(50, 0, 50, height, { stroke: 'red' });
    };

    drawNotebookLines();
  }, [dimensions]); // Run this effect when dimensions change

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute top-0 left-0 z-0"
    />
  );
};

export default NotebookBackground;