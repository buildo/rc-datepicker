import React, { PropTypes } from 'react';
import DateUtils from '../utils/DateUtils.js';
import DayPickerTop from './DayPickerTop';
import DayPickerBody from './DayPickerBody';

const DayPicker = React.createClass({

  propTypes: {
    changeMonth: PropTypes.func.isRequired,
    visibleDate: PropTypes.any.isRequired,
    date: DateUtils.evaluateDateProp,
    minDate: DateUtils.evaluateDateProp,
    maxDate: DateUtils.evaluateDateProp,
    onSelectDate: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    fixedMode: React.PropTypes.bool
  },

  _onSelectDate(date) {
    this.props.onSelectDate(date);
  },

  render() {
    return (
      <div className='react-datepicker-container day'>
        <DayPickerTop
          changeMonth={this.props.changeMonth}
          visibleDate={this.props.visibleDate}
          onChangeMode={this.props.onChangeMode}
          fixedMode={this.props.fixedMode}
        />
        <DayPickerBody
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

export default DayPicker;
