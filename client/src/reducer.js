const reducer = (state, action) => {
  switch (action.type) {
    case 'LANGUAGE_CHANGE':
      return { ...state, currentLanguage: action.payload };

    case 'DISPLAY_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, searchError: null };

    case 'NO_SEARCH_RESULTS': {
      let searchResultsMessage;
      switch (state.currentLanguage) {
        case 'ro':
          searchResultsMessage = 'Nu a fost găsită nici o clădire cu adresa';
          break;
        case 'hu':
        default:
          searchResultsMessage = 'No testing_center was found matching the address';
      }
      return {
        ...state,
        searchResults: [],
        searchError: `${searchResultsMessage} "${action.payload}".`,
      };
    }

    case 'SEARCH_ERROR': {
      let searchError;
      switch (state.currentLanguage) {
        case 'ro':
          searchError = 'Serverul este indisponibil.';
          break;
        case 'hu':
        default:
          searchError = 'Server unavailable.';
      }

      return {
        ...state,
        searchResults: [],
        searchError,
      };
    }

    case 'SEARCH_LOADING': {
      return {
        ...state,
        searchLoading: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
