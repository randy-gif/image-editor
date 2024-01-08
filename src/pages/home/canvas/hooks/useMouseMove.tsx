import { useState, useEffect, RefObject } from 'react';
import { throttle } from 'lodash';

interface MousePosition {
  x: number | null;
  y: number | null;
}

function useMoseMove(ref: RefObject<HTMLElement>): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: null, y: null });

  const handleMouseMove =(event: MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY
    });
  };
  const throttledMouseMove = throttle(handleMouseMove, 50);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', throttledMouseMove);

      return () => {
        throttledMouseMove.cancel();
        element.removeEventListener('mousemove', throttledMouseMove);
      };
    }
  }, [ref]);

  return mousePosition;
}

export default useMoseMove;