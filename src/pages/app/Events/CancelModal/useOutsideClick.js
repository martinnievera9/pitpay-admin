import { useEffect } from 'react';

const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    callback();
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
