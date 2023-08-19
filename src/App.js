import React from 'react';
import Home from './Components/Home';
import Speakers from './Components/Speakers/Speakers';
import { ConfigContext } from './Contexts/ConfigContext';
import { GlobalProvider } from './Contexts/GlobalState';
import { FavoriteClickCountProvider } from './Contexts/FavoriteClickCountContext';

const pageToShow = (pageName) => {
  if (pageName === 'Home') return <Home></Home>;
  if (pageName === 'Speakers') return <Speakers></Speakers>;
  return <div>Not Found</div>;
};
const configValue = {
  showSignMeUp: true,
  showSpeakerSpeakingDays: true,
};
const App = ({ pageName }) => {
  return (
    <ConfigContext.Provider value={configValue}>
      <GlobalProvider>
        <FavoriteClickCountProvider>
          <div>{pageToShow(pageName)}</div>
        </FavoriteClickCountProvider>
      </GlobalProvider>
    </ConfigContext.Provider>
  );
};

export default App;
