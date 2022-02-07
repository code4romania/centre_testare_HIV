import React, { createContext, useReducer, useContext } from 'react';
import { i18n } from '@lingui/core';

import reducer from './reducer';
import config from './config';

const { CENTER_URL } = config;

const AppContext = createContext();

const initialState = {
  searchResults: [],
  searchLoading: false,
  searchError: null,
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

  const onSearchLoading = (isLoading) => {
    dispatch({ type: 'SEARCH_LOADING', payload: isLoading });
  };

  // @TODO update to new API endpoint and new schema
  const searchBuildings = async (searchInput) => {
    try {
      const res = await fetch(`${CENTER_URL}search/?query=${searchInput}`);
      const searchResults = await res.json();
      onSearchLoading(false);
      if (searchResults.length > 0) {
        dispatch({ type: 'DISPLAY_SEARCH_RESULTS', payload: searchResults });
      } else {
        dispatch({ type: 'NO_SEARCH_RESULTS', payload: searchInput });
      }
    } catch (err) {
      dispatch({ type: 'SEARCH_ERROR' });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        searchBuildings,
        onSearchLoading,
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
