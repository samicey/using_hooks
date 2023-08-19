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
    imageIdentifier,
    forceImageRerender
  } = useSpeakerDataManager();
  const provider = {
    isLoading,
    speakerList,
    favoriteClickCount,
    incrementFavoriteClickCount,
    toggleSpeakerFavorite,
    hasError,
    error,
    imageIdentifier,
    forceImageRerender
  };
  return <GlobalContext.Provider value={provider}>{children}</GlobalContext.Provider>;
};
