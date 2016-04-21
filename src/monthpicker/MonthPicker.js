import React, { PropTypes } from 'react';
import DateUtils from '../utils/DateUtils.js';
import MonthPickerTop from './MonthPickerTop';
import MonthPickerBody from './MonthPickerBody';

const MonthPicker = React.createClass({

  propTypes: {
    changeYear: PropTypes.func.isRequired,
    visibleDate: PropTypes.any.isRequired,
    date: DateUtils.evaluateDateProp,
    minDate: DateUtils.evaluateDateProp,
    maxDate: DateUtils.evaluateDateProp,
    onChangeVisibleDate: PropTypes.func.isRequired,
    onSelectDate: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    fixedMode: PropTypes.bool
  },

  _onSelectDate(date) {
    if (this.props.fixedMode) {
      this.props.onSelectDate(date);
    } else {
      this.props.onChangeVisibleDate(date);
      this.props.onChangeMode('day');
    }
  },

  render() {
    return (
      <div className='react-datepicker-container month'>
        <MonthPickerTop
          changeYear={this.props.changeYear}
          visibleDate={this.props.visibleDate}
          onChangeMode={this.props.onChangeMode}
          fixedMode={this.props.fixedMode}
        />
        <MonthPickerBody
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

export default MonthPicker;
