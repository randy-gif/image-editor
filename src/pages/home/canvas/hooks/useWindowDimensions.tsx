import {useState, useEffect} from 'react';

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState<{width: number, height: number}>({ width: 0, height: 0 });
    useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
    return {windowDimensions};
}

export default useWindowDimensions;