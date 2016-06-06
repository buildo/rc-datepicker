import moment from 'moment';
import range from 'lodash/range';

export const daysInMonthCount = (month, year) => moment([year, month]).endOf('month').date();

export const getArrayByBoundary = (start, end) => {
  return range(end - start).map(i => i + start);
};

export const getWeekdaysMin = () => {
  const offset = moment().localeData().firstDayOfWeek();
  const weekdaysMin = moment.weekdaysMin();

  range(offset).forEach(() => {
    const firstDay = weekdaysMin.shift();
    weekdaysMin.push(firstDay);
  });
  return weekdaysMin;
};

export const getVisibleDays = (month, year) => {
  const offset = moment([year, month]).startOf('month').weekday();
  const previousMonth = month === 0 ? 11 : (month - 1);
  const previousYear = month === 0 ? (year - 1) : year;

  const currentMonthLength = daysInMonthCount(month, year) + 1;
  const previousMonthLength = daysInMonthCount(previousMonth, previousYear) + 1; // We need the last number too

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

export const evaluateDateProp = (props, propName, componentName) => {
  const dateProp = props[propName];
  if (dateProp && (typeof dateProp !== 'string' && !(dateProp instanceof Date) && !moment.isMoment(dateProp))) {
    return new Error(`${propName} validation failed in ${componentName}`);
  }
};

export const isInsideTheEnabledArea = (date, mode, minDate, maxDate) => {
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
