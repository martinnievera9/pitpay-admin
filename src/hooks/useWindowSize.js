import { useState, useLayoutEffect } from 'react';

export default () => {
  const [size, setSize] = useState([window.innerWidth]);

  useLayoutEffect(() => {
    function updateSize() {
      if (size[0] !== window.innerWidth)
        setSize([window.innerWidth]);
    }
    window.addEventListener('resize', updateSize, { passive: true });
    updateSize();
    return () =>
      window.removeEventListener('resize', updateSize, { passive: true });
  }, [size]);

  return size;
};
