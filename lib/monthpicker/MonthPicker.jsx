'use strict';

import React from 'react';
import DateUtils from '../utils/DateUtils.js';
import MonthPickerTop from './MonthPickerTop.jsx';
import MonthPickerBody from './MonthPickerBody.jsx';

const MonthPicker = React.createClass({

  propTypes: {
    visibleDate:         React.PropTypes.any.isRequired,
    date:                DateUtils.evaluateDateProp,
    minDate:             DateUtils.evaluateDateProp,
    maxDate:             DateUtils.evaluateDateProp,
    onChangeVisibleDate: React.PropTypes.func.isRequired,
    onSelectDate:        React.PropTypes.func.isRequired,
    onChangeMode:        React.PropTypes.func.isRequired,
    locale:              React.PropTypes.string.isRequired,
    mode:                React.PropTypes.string.isRequired,
    fixedMode:           React.PropTypes.bool
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
      <div className='container month'>
        <MonthPickerTop
          visibleDate={this.props.visibleDate}
          onChangeVisibleDate={this.props.onChangeVisibleDate}
          onChangeMode={this.props.onChangeMode}
          fixedMode={this.props.fixedMode} />
        <MonthPickerBody
          visibleDate={this.props.visibleDate}
          date={this.props.date}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          onSelectDate={this._onSelectDate}
          mode={this.props.mode}
          locale={this.props.locale} />
      </div>
    );
  }
});

export default MonthPicker;
