import { useMemo } from 'react';

export const useSpeakersFilter = (speakerList, speakingSaturday, speakingSunday) => {
  return useMemo(() => {
    return speakerList
      .filter(({ sun, sat }) => (speakingSaturday && sat) || (speakingSunday && sun))
      .sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });
  }, [speakerList, speakingSaturday, speakingSunday]);
};
