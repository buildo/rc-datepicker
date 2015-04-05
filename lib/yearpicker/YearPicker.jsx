'use strict';

import React from 'react';
import YearPickerTop from './YearPickerTop.jsx';
import YearPickerBody from './YearPickerBody.jsx';

const YearPicker = React.createClass({

  propTypes: {
    visibleDate:      React.PropTypes.any.isRequired,
    selectedDate:     React.PropTypes.any,
    onChangeDate:     React.PropTypes.func.isRequired,
    onSelectDate:     React.PropTypes.func.isRequired,
    onChangeMode:     React.PropTypes.func.isRequired,
    mode:             React.PropTypes.string.isRequired,
    fixed:            React.PropTypes.bool,
    classNamePrefix:  React.PropTypes.string.isRequired
  },

  _onSelectDate(date) {
    if (this.props.fixed) {
      this.props.onSelectDate(date);
    } else {
      this.props.onChangeDate(date);
      this.props.onChangeMode('month');
    }
  },

  render() {
    return (
      <div className={this.props.classNamePrefix + ' container year'}>
        <YearPickerTop
          visibleDate={this.props.visibleDate}
          onChangeDate={this.props.onChangeDate}
          classNamePrefix={this.props.classNamePrefix} />
        <YearPickerBody
          visibleDate={this.props.visibleDate}
          selectedDate={this.props.selectedDate}
          onSelectDate={this._onSelectDate}
          mode={this.props.mode}
          classNamePrefix={this.props.classNamePrefix} />
      </div>
    );
  }
});

export default YearPicker;
