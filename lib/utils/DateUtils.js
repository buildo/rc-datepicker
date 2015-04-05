'use strict';

import locales from './Locales.js';
import moment from 'moment';

export const daysInMonthCount = (month, year)  => moment([year, month]).endOf('month').date();

export const getArrayByBoundary = (start, end) => {
  const arr = Array.apply(null, Array(end - start));
  return arr.map((x, i)  => (i + start));
};

export const getVisibleDays = (month, year, location) => {
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

export const getVisibleYears = (year) => {
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
