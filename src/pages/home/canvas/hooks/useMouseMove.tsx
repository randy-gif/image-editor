import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
  x: number | null;
  y: number | null;
}

function useMoseMove(ref: RefObject<HTMLElement>): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null });

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [ref]);

  return mousePosition;
}

export default useMoseMove;
