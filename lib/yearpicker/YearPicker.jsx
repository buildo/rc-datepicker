'use strict';

import React from 'react';
import DateUtils from '../utils/DateUtils.js';
import YearPickerTop from './YearPickerTop.jsx';
import YearPickerBody from './YearPickerBody.jsx';

const YearPicker = React.createClass({

  propTypes: {
    visibleDate:         React.PropTypes.any.isRequired,
    date:                DateUtils.evaluateDateProp,
    onChangeVisibleDate: React.PropTypes.func.isRequired,
    onSelectDate:        React.PropTypes.func.isRequired,
    onChangeMode:        React.PropTypes.func.isRequired,
    mode:                React.PropTypes.string.isRequired,
    fixedMode:           React.PropTypes.bool,
    className:           React.PropTypes.string.isRequired
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
      <div className={this.props.className + ' container year'}>
        <YearPickerTop
          visibleDate={this.props.visibleDate}
          onChangeVisibleDate={this.props.onChangeVisibleDate}
          className={this.props.className} />
        <YearPickerBody
          visibleDate={this.props.visibleDate}
          date={this.props.date}
          onSelectDate={this._onSelectDate}
          mode={this.props.mode}
          className={this.props.className} />
      </div>
    );
  }
});

export default YearPicker;
