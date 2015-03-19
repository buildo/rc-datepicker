'use strict';

const locales = require('./Locales.js');
const moment = require('moment');

const daysInMonthCount = (month, year)  => moment([year, month]).endOf('month').date();

const getArrayByBoundary = (start, end) => {
  const arr = Array.apply(null, Array(end - start));
  return arr.map((x, i)  => (i + start));
};

const getVisibleDays = (month, year, location) => {
  const offset = moment([year, month]).locale(location).startOf('month').weekday();
  const previousMonthLength = daysInMonthCount(month - 1, year) + 1; //We need the last number too
  const currentMonthLength = daysInMonthCount(month, year) + 1;

  const previous = getArrayByBoundary(previousMonthLength - offset, previousMonthLength);
  const current = getArrayByBoundary(1, currentMonthLength);
  const following = getArrayByBoundary(1, 43 - previous.length - current.length);
  return {
    startCurrent: previous.length,
    endCurrent: previous.length + current.length - 1,
    days: previous.concat(current).concat(following)
  };
};

const getVisibleYears = (year) => {
  const startDecadeYear = parseInt(year / 10, 10) * 10;
  const endDecadeYear = startDecadeYear + 9;
  const previous = [startDecadeYear - 1];
  const current = getArrayByBoundary(startDecadeYear, endDecadeYear + 1);
  const following = [endDecadeYear + 1];
  return {
    startCurrent: previous.length,
    endCurrent: previous.length + current.length - 1,
    years: previous.concat(current).concat(following)
  };
};

// const formatDate = (date, format, location) => {
//   format = format || locales.get('format', location);
//   const validParts = /dd?|DD?|mm?|MM?|yy(?:yy)?/g;
//   const separators = format.replace(validParts, '\0').split('\0'); // not to be replaced
//   const parts = format.match(validParts); // to be replaced
//   const val = {
//     dd: ('0' + date.getDate()).slice(-2),
//     d: date.getDate(),
//     DD: locales.get('days', location)[date.getDay()],
//     D: locales.get('daysShort', location)[date.getDay()],
//     mm: ('0' + (date.getMonth() + 1)).slice(-2),
//     m: date.getMonth() + 1,
//     MM: locales.get('months', location)[date.getMonth()],
//     M: locales.get('monthsShort', location)[date.getMonth()],
//     yyyy: date.getFullYear(),
//     yy: date.getFullYear().toString().substring(2)
//   };

//   return parts.reduce((acc, part) => {
//       acc.push(separators.shift());
//       acc.push(val[part]);
//       return acc;
//     },
//     []
//   ).join('');
// };


module.exports = {
  daysInMonthCount: daysInMonthCount,
  getArrayByBoundary: getArrayByBoundary,
  getVisibleDays: getVisibleDays,
  getVisibleYears: getVisibleYears,
  // getMonths: (location) => locales.get('months', location),
  // getMonthsShort: (location) => locales.get('monthsShort', location),
  // getDays: (location) => locales.get('days', location),
  // getDaysShort: (location) => locales.get('daysShort', location),
  // getDaysMin: (location) => locales.get('daysMin', location).slice(locales.get('weekStart', location), locales.get('weekStart', location) + 7),
  // getWeekStart: (location) => locales.get('weekStart', location),
  // getFormat: (location) => locales.get('format', location),
};
