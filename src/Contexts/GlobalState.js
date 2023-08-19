import React from 'react';
import useSpeakerDataManager from '../Hooks/useSpeakerDataManager';

export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
    hasError,
    error,
  } = useSpeakerDataManager();
  const provider = {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
    hasError,
    error,
  };
  return <GlobalContext.Provider value={provider}>{children}</GlobalContext.Provider>;
};
