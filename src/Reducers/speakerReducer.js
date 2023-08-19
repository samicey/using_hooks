export const setSpeakerReducer = (state, action) => {
  const updateFavorite = (favoriteValue) => {
    return state.speakerList.map((item) => {
      if (action.id === item.id) {
        return { ...item, favorite: favoriteValue };
      }
      return item;
    });
  };
  switch (action.type) {
    case 'setSpeakerList':
      return { ...state, speakerList: action.data, isLoading: false,  hasError: false, error: null};
    case 'favorite':
      return { ...state, speakerList: updateFavorite(true) };
    case 'unfavorite':
      return { ...state, speakerList: updateFavorite(false) };
    case 'incrementFavoriteClickCount':
      return { ...state, favoriteClickCount: state.favoriteClickCount + 1 };
    case 'errored':
      return { ...state, isLoading: false, hasError: true, error: action.error };
    default:
      return state;
  }
};
