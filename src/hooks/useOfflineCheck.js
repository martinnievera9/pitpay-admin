import { useEffect, useState } from 'react';

export function useOfflineCheck() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const onLineChange = () => {
      if (isOffline === !navigator.onLine) return;
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('offline', onLineChange);
    window.addEventListener('online', onLineChange);

    return () => {
      window.removeEventListener('online', onLineChange);
      window.removeEventListener('offline', onLineChange);
    };
  }, [isOffline]);
  return isOffline;
}
