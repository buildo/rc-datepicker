import React, { PropTypes } from 'react';
import DateUtils from '../utils/DateUtils.js';
import YearPickerTop from './YearPickerTop';
import YearPickerBody from './YearPickerBody';

const YearPicker = React.createClass({

  propTypes: {
    changeYear: PropTypes.func.isRequired,
    visibleDate: PropTypes.any.isRequired,
    date: DateUtils.evaluateDateProp,
    minDate: DateUtils.evaluateDateProp,
    maxDate: DateUtils.evaluateDateProp,
    onSelectDate: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    onChangeVisibleDate: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    fixedMode: PropTypes.bool
  },

  _onSelectDate(date) {
    if (this.props.fixedMode) {
      this.props.onSelectDate(date);
    } else {
      this.props.onChangeVisibleDate(date);
      this.props.onChangeMode('month');
    }
  },

  render() {
    return (
      <div className='react-datepicker-container year'>
        <YearPickerTop
          changeYear={this.props.changeYear}
          visibleDate={this.props.visibleDate}
        />
        <YearPickerBody
          visibleDate={this.props.visibleDate}
          date={this.props.date}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          onSelectDate={this._onSelectDate}
          mode={this.props.mode}
        />
      </div>
    );
  }
});

export default YearPicker;
