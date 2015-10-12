import moment from 'moment';

export default {
  getDisplayFormat(props) {
    const { displayFormat, fixedMode, startMode } = (props || this.props);
    if (displayFormat) {
      return displayFormat;
    }
    if (fixedMode) {
      switch (startMode) {
        case 'day':
          return 'DD';
        case 'month':
          return 'MMMM';
        case 'year':
          return 'YYYY';
      }
    }

    return 'L';
  },

  formatReturnedDate(date, props) {
    const { returnFormat } = (props || this.props);
    return date.format(returnFormat);
  },

  formatDisplayedDate(date, props) {
    return date.format(this.getDisplayFormat(props));
  },

  parsePropDateString(dateString, props) {
    const { returnFormat } = (props || this.props);
    if (!returnFormat) {
      return moment(dateString);
    } else {
      return moment(dateString, returnFormat, true);
    }
  },

  parseInputDateString(dateString, props) {
    const format = this.getDisplayFormat(props);
    if (!format) {
      return moment(dateString);
    } else {
      return moment(dateString, format, true);
    }
  }

};