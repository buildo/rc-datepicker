'use strict';

import React from 'react';
import DayPickerTop from './DayPickerTop.jsx';
import DayPickerBody from './DayPickerBody.jsx';

const DayPicker = React.createClass({

  propTypes: {
    visibleDate:      React.PropTypes.any.isRequired,
    selectedDate:     React.PropTypes.any,
    onChangeDate:     React.PropTypes.func.isRequired,
    onSelectDate:     React.PropTypes.func.isRequired,
    onChangeMode:     React.PropTypes.func.isRequired,
    location:         React.PropTypes.string.isRequired,
    mode:             React.PropTypes.string.isRequired,
    fixed:            React.PropTypes.bool,
    classNamePrefix:  React.PropTypes.string.isRequired
  },

  _onSelectDate(date) {
    this.props.onSelectDate(date);
  },

  render() {
    return (
      <div className={this.props.classNamePrefix + ' container day'}>
        <DayPickerTop
          visibleDate={this.props.visibleDate}
          onChangeDate={this.props.onChangeDate}
          onChangeMode={this.props.onChangeMode}
          location={this.props.location}
          fixed={this.props.fixed}
          classNamePrefix={this.props.classNamePrefix} />
        <DayPickerBody
          visibleDate={this.props.visibleDate}
          selectedDate={this.props.selectedDate}
          onSelectDate={this._onSelectDate}
          mode={this.props.mode}
          location={this.props.location}
          classNamePrefix={this.props.classNamePrefix} />
      </div>
    );
  }
});

export default DayPicker;
