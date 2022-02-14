import React, { createContext, useReducer, useContext } from 'react';
import { i18n } from '@lingui/core';

import reducer from './reducer';

const AppContext = createContext();

const initialState = {
  currentLanguage: 'ro',
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const languageChange = async (locale) => {
    const { messages } = await import(`./locales/${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
    dispatch({ type: 'LANGUAGE_CHANGE', payload: locale });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        languageChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
