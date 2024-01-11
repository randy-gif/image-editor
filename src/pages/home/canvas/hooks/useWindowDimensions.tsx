import {useState, useEffect} from 'react';

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState<{width: number, height: number}>({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        function handleResize() {
            if(window.visualViewport) {
                setWindowDimensions({
                    width: window.visualViewport.width,
                    height: window.visualViewport.height
                });
            } else {
                setWindowDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
    return windowDimensions;
}

export default useWindowDimensions;