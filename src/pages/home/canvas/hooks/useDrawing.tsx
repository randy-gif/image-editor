import { useState } from 'react';

// Define drawing types
interface Rectangle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string
}

interface Circle {
  id: number;
  x: number;
  y: number;
  radius: number;
}

// Define the generic drawing type that can be one of the specific types
type DrawingType = 'backgroundColor' | 'img' | 'circle' | 'rectangle' | 'triangle' | 'line' | 'text';

// Union type of all specific drawing types
type DrawingObject = Rectangle | Circle;

function useDrawing() {
  const [drawing, setDrawing] = useState<({
    type: string;
    drawings: (string | DrawingObject)[];
  })[]>([
    { type: 'backgroundColor', drawings: ['black'] },
    { type: 'img', drawings: [] },
    { type: 'circle', drawings: [] },
    { type: 'rectangle', drawings: [] },
    { type: 'triangle', drawings: [] },
    { type: 'line', drawings: [] },
    { type: 'text', drawings: [] }
  ]);

  function verifyType(type: DrawingType) {
    return drawing.some((item) => item.type === type);
  }

  const addDrawing = (type: DrawingType, newDrawing: DrawingObject | string) => {
    if (!verifyType(type)) {
      console.error('Type does not exist');
      return 1;
    } else {
      setDrawing((prevDrawing) => {
        return prevDrawing.map((item) =>
          item.type === type
            ? {
                ...item,
                drawings: item.drawings.some((draw) => typeof draw === 'object' && 'id' in draw && draw.id === (newDrawing as DrawingObject).id)
                  ? item.drawings.map((draw) =>
                      typeof draw === 'object' && 'id' in draw && draw.id === (newDrawing as DrawingObject).id
                        ? newDrawing
                        : draw
                    )
                  : [...item.drawings, newDrawing]
              }
            : item
        );
      });
    }
  };

  return { drawing, addDrawing };
}

export default useDrawing;