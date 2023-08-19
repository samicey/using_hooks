import React, { useState, useContext, useCallback } from 'react';
import { Header } from '../Utils/Header';
import { Menu } from '../Utils/Menu';
import SpeakerDetail from './SpeakerDetail';
import { useSpeakersFilter } from '../../Hooks/useSpeakerFilterHook';
import { ConfigContext } from '../../Contexts/ConfigContext';
import { GlobalContext } from '../../Contexts/GlobalState';

const Speakers = ({}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);
  const context = useContext(ConfigContext);
  const { isLoading, speakerList, toggleSpeakerFavorite, hasError, error, forceImageRerender } = useContext(GlobalContext);
  const speakerFilteredList = useSpeakersFilter(speakerList, speakingSaturday, speakingSunday);

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
    forceImageRerender()
  };
  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
    forceImageRerender()
  };
  const heartFavoriteHandler = useCallback((e, speakerRec) => {
    e.preventDefault();
    toggleSpeakerFavorite(speakerRec);
  }, []);

  const filteredSpeakers = isLoading ? [] : speakerFilteredList;

  if (isLoading) return <div>Loading...</div>;

  if (hasError) return <div>Error {error.message}</div>;

  return (
    <div>
      <Header />
      <Menu />
      <div className='container'>
        <div className='btn-toolbar margintopbottom5 chekbox-bigger'>
          {context.showSpeakerSpeakingDays ? (
            <div className='hide'>
              <div className='form-check-inline'>
                <label className='form-check-label'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    onChange={handleChangeSaturday}
                    checked={speakingSaturday}
                  />
                  Saturday Speakers
                </label>
              </div>
              <div className='form-check-inline'>
                <label className='form-check-label'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    onChange={handleChangeSunday}
                    checked={speakingSunday}
                  />
                  Sunday Speakers
                </label>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='row'>
          <div className='card-deck'>
            {filteredSpeakers.map((speakerRec) => (
              <SpeakerDetail
                key={speakerRec.id}
                speakerRec={speakerRec}
                onHeartFavoriteHandler={heartFavoriteHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
