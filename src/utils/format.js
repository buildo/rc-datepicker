import moment from 'moment';

export default function format(Component) {

  Component.prototype.getDisplayFormat = function(props) {
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
  };

  Component.prototype.formatReturnedDate = function(date, props) {
    const { returnFormat } = (props || this.props);
    return date.format(returnFormat);
  };

  Component.prototype.formatDisplayedDate = function(date, props) {
    return date.format(this.getDisplayFormat(props));
  };

  Component.prototype.parsePropDateString = function(dateString, props) {
    const { returnFormat } = (props || this.props);
    if (!returnFormat) {
      return moment(dateString);
    } else {
      return moment(dateString, returnFormat, true);
    }
  };

  Component.prototype.parseInputDateString = function(dateString, props) {
    const { format } = (props || this.props);
    const parseFormat = format ? format : this.getDisplayFormat(props);
    if (!parseFormat) {
      return moment(dateString);
    } else {
      return moment(dateString, parseFormat, true);
    }
  };

}
