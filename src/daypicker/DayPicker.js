
import React from 'react';
import DateUtils from '../utils/DateUtils.js';
import DayPickerTop from './DayPickerTop';
import DayPickerBody from './DayPickerBody';

const DayPicker = React.createClass({

  /* eslint-disable key-spacing */
  propTypes: {
    visibleDate:         React.PropTypes.any.isRequired,
    date:                DateUtils.evaluateDateProp,
    minDate:             DateUtils.evaluateDateProp,
    maxDate:             DateUtils.evaluateDateProp,
    onChangeVisibleDate: React.PropTypes.func.isRequired,
    onSelectDate:        React.PropTypes.func.isRequired,
    onChangeMode:        React.PropTypes.func.isRequired,
    mode:                React.PropTypes.string.isRequired,
    fixedMode:           React.PropTypes.bool
  },
  /* eslint-enable key-spacing */

  _onSelectDate(date) {
    this.props.onSelectDate(date);
  },

  render() {
    return (
      <div className='react-datepicker-container day'>
        <DayPickerTop
          visibleDate={this.props.visibleDate}
          onChangeVisibleDate={this.props.onChangeVisibleDate}
          onChangeMode={this.props.onChangeMode}
          fixedMode={this.props.fixedMode} />
        <DayPickerBody
          visibleDate={this.props.visibleDate}
          date={this.props.date}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          onSelectDate={this._onSelectDate}
          mode={this.props.mode} />
      </div>
    );
  }
});

export default DayPicker;
