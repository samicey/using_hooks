import { useEffect, useReducer } from 'react';
import { setSpeakerReducer } from '../Reducers/speakerReducer';
import SpeakerData from '../Components/Speakers/SpeakerData';

const useSpeakerDataManager = () => {
  const [{ isLoading, speakerList }, dispatch] = useReducer(setSpeakerReducer, {
    isLoading: true,
    speakerList: [],
  });

  function toggleSpeakerFavorite(speakerRec) {
    speakerRec.favorite === true
      ? dispatch({ type: 'unfavorite', id: speakerRec.id })
      : dispatch({ type: 'favorite', id: speakerRec.id });
  }
  useEffect(() => {
    new Promise(function (resolve) {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => {
      dispatch({
        type: 'setSpeakerList',
        data: SpeakerData,
      });
    });

    return () => {
      console.log('cleanup');
    };
  }, []);

  return { isLoading, speakerList, toggleSpeakerFavorite };
};

export default useSpeakerDataManager;
