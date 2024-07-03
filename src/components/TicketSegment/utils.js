import { add } from 'date-fns';

export function minutesToTime(minutes) {
  const hours = Math.round(minutes / 60);
  const minute = minutes % 60;
  return `${hours}ч ${minute}м`;
}

export function timeFormatForTicket(date, duration) {
  let dateCopy;
  if (duration) {
    let millisecondsWithDuration = add(new Date(date), {
      minutes: duration,
    });
    dateCopy = new Date(millisecondsWithDuration);
  } else {
    dateCopy = new Date(date);
  }

  const hours = dateCopy.getHours();
  const minutes = dateCopy.getMinutes();

  return `${hours}:${minutes}`;
}
