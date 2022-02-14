const reducer = (state, action) => {
  switch (action.type) {
    case 'LANGUAGE_CHANGE':
      return { ...state, currentLanguage: action.payload };

    default:
      return state;
  }
};

export default reducer;
