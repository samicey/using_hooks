import axios from 'axios';
import { useEffect, useReducer, useContext } from 'react';
import { setSpeakerReducer } from '../Reducers/speakerReducer';
import { InitialSpeakersDataContext } from '../Contexts/InitialSpeakersDataContext';

const useSpeakerDataManager = () => {
  const context = useContext(InitialSpeakersDataContext);
  const [{ isLoading, speakerList }, dispatch] = useReducer(setSpeakerReducer, {
    isLoading: false,
    speakerList: context.initialSpeakersData,
  });

  function toggleSpeakerFavorite(speakerRec) {
    const updateData = async () => {
      await axios.put(`/api/speakers/${speakerRec.id}`, {...speakerRec, favorite: !speakerRec.favorite });
      speakerRec.favorite === true
        ? dispatch({ type: 'unfavorite', id: speakerRec.id })
        : dispatch({ type: 'favorite', id: speakerRec.id });
    };
    updateData();
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/speakers');
      dispatch({
        type:'setSpeakerList',
        data: result.data
      })
    };
    fetchData();
    
    return () => {
      console.log('cleanup');
    };
  }, []);

  return { isLoading, speakerList, toggleSpeakerFavorite };
};

export default useSpeakerDataManager;
