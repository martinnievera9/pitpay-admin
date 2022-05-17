import { useState } from 'react';

export default () => {
  const [alert, setAlert] = useState();

  const setTemporaryAlert = (message, color, number, error) => {
    setAlert({ message, color, error });
    setTimeout(() => setAlert(), number);
  };

  return [alert, setTemporaryAlert];
};
