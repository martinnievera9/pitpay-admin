import { useEffect, useRef } from 'react';

export function timeout(callback, time) {
  const wait = () =>
    new Promise(resolve => {
      setTimeout(resolve, time);
    });
  wait()
    .then(() => callback.call(null))
    .catch(() => null);
}

export function useInterval(callback, delay) {
  const intervalId = useRef(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalId.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalId.current);
    }
  }, [delay]);

  return intervalId.current;
}
