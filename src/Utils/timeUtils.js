import moment from "moment-timezone";


export function convertIscToUtc(istDateString) {
  const istDate = new Date(istDateString);
  const utcDate = new Date(istDate.getTime() - 5.5 * 60 * 60 * 1000);
  return utcDate;
}

export function convertUtcToIsc(utcDateString) {
  const utcDate = new Date(utcDateString);
  const istDate = new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000);
  return istDate;
}

