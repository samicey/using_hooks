import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { setSpeakerReducer } from '../Reducers/speakerReducer';

const useSpeakerDataManager = () => {
  const [{ isLoading, speakerList, favoriteClickCount, hasError, error }, dispatch] = useReducer(setSpeakerReducer, {
    isLoading: true,
    speakerList: [],
    favoriteClickCount: 0,
    hasError: false,
    error: null
  });

  function toggleSpeakerFavorite(speakerRec) {
    const updateData = async () => {
      await axios.put(`/api/speakers/${speakerRec.id}`, { ...speakerRec, favorite: !speakerRec.favorite });
      speakerRec.favorite === true
        ? dispatch({ type: 'unfavorite', id: speakerRec.id })
        : dispatch({ type: 'favorite', id: speakerRec.id });
    };
    updateData();
  }

  function incrementFavoriteClickCount() {
    dispatch({ type: 'incrementFavoriteClickCount' });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/speakers');
        dispatch({
          type: 'setSpeakerList',
          data: result.data,
        });
      } catch (error) {
        dispatch({type: 'errored', error })
      }
    };
    fetchData();

    return () => {
      console.log('cleanup');
    };
  }, []);

  return { isLoading, speakerList, favoriteClickCount, incrementFavoriteClickCount, toggleSpeakerFavorite, hasError, error };
};

export default useSpeakerDataManager;
