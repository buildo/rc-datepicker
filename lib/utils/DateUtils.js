'use strict';

import locales from './Locales.js';
import moment from 'moment';
import {range} from 'lodash/utility';

const daysInMonthCount = (month, year)  => moment([year, month]).endOf('month').date();

const getArrayByBoundary = (start, end) => {
  const arr = Array.apply(null, Array(end - start));
  return arr.map((x, i)  => (i + start));
};

const getWeekdaysMin = () => {
  const offset = moment().localeData().firstDayOfWeek();
  const weekdaysMin = moment.weekdaysMin();

  range(offset).forEach((x) => {
    const firstDay = weekdaysMin.shift();
    weekdaysMin.push(firstDay);
  });
  return weekdaysMin;
};

const getVisibleDays = (month, year, locale) => {
  const offset = moment([year, month]).locale(locale).startOf('month').weekday();
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

const evaluateDateProp = (props, propName, componentName) => {
  const dateProp = props[propName];
  if (dateProp && (typeof dateProp !== 'string' && !(dateProp instanceof Date) && !moment.isMoment(dateProp))) {
    return new Error(propName + ' validation failed in ' + componentName);
  }
};

const isInsideTheEnabledArea = (date, mode, minDate, maxDate) => {
  if (!minDate && !maxDate) {
    return true;
  }

  const minDateMoment = typeof minDate === 'string' ? moment(minDate, moment.ISO_8601, true) : moment(minDate);
  const maxDateMoment = typeof maxDate === 'string' ? moment(maxDate, moment.ISO_8601, true) : moment(maxDate);

  let format;
  switch (mode) {
    case 'day':
      format = 'YYYY/MM/DD';
      break;

    case 'month':
      format = 'YYYY/MM';
      break;

    case 'year':
      format = 'YYYY';
      break;
  }

  return (!minDate || date.format(format) >= minDateMoment.format(format)) && (!maxDate || date.format(format) <= maxDateMoment.format(format));
};

export default {
  daysInMonthCount,
  getVisibleDays,
  getVisibleYears,
  getWeekdaysMin,
  evaluateDateProp,
  isInsideTheEnabledArea,
  getArrayByBoundary
};
