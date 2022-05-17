import React, { useReducer, createContext } from 'react';
import storage from './storage';

export const AppContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.theme };
    case 'SET_STRIPE_STATUS':
      return { ...state, isStripeSetup: action.status };
    default:
      return state;
  }
};

const setDefaultTheme = () => {
  if ('tickethoss' !== process.env.REACT_APP_PLATFORM) {
    return 'dark';
  }

  const step = storage.get('current-step');

  if (!step || 'StepOne' === step || 'StepTwo' === step) {
    return 'light';
  } else {
    return 'dark';
  }
};

export default ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    theme: setDefaultTheme(),
  });

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
