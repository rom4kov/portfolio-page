import { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [width, setWidth] = useState<number>(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return width;
}

export default useWindowSize;
