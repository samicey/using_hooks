import React from 'react';
import App from '../src/App';
import fs from 'fs/promises';
import path from 'path';
import { InitialSpeakersDataContext } from '../src/Contexts/InitialSpeakersDataContext';

export async function getServerSideProps() {
  const readFile = fs.readFile;
  let initialSpeakersData;
  try {
    const jsonFile = path.resolve('./', 'db.json');
    const readSpeakersArray = await readFile(jsonFile);
     initialSpeakersData = JSON.parse(readSpeakersArray).speakers;
  } catch (error) {
    console.log('/api/speakers ', error);
  }
 return { props: { initialSpeakersData }};
}

const Speakers = ({ initialSpeakersData }) => {
  const initialValue = {
    initialSpeakersData,
  };
  return (
  <InitialSpeakersDataContext.Provider value={initialValue} >
    <App pageName='Speakers' />
  </InitialSpeakersDataContext.Provider>
  );
};

export default Speakers;
