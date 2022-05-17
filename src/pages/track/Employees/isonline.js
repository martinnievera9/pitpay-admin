useEffect(() => {
  const isOnline = () => {};

  window.addEventListener('online', isOnline);
  return () => window.removeEventListener('online', isOnline);
}, []);
