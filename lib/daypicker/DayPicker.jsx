'use strict';

import React from 'react';
import DayPickerTop from './DayPickerTop.jsx';
import DayPickerBody from './DayPickerBody.jsx';

const DayPicker = React.createClass({

  propTypes: {
    visibleDate:         React.PropTypes.any.isRequired,
    date:                React.PropTypes.any,
    onChangeVisibleDate: React.PropTypes.func.isRequired,
    onSelectDate:        React.PropTypes.func.isRequired,
    onChangeMode:        React.PropTypes.func.isRequired,
    locale:              React.PropTypes.string.isRequired,
    mode:                React.PropTypes.string.isRequired,
    fixedMode:           React.PropTypes.bool,
    className:           React.PropTypes.string.isRequired
  },

  _onSelectDate(date) {
    this.props.onSelectDate(date);
  },

  render() {
    return (
      <div className={this.props.className + ' container day'}>
        <DayPickerTop
          visibleDate={this.props.visibleDate}
          onChangeVisibleDate={this.props.onChangeVisibleDate}
          onChangeMode={this.props.onChangeMode}
          fixedMode={this.props.fixedMode}
          className={this.props.className} />
        <DayPickerBody
          visibleDate={this.props.visibleDate}
          date={this.props.date}
          onSelectDate={this._onSelectDate}
          mode={this.props.mode}
          locale={this.props.locale}
          className={this.props.className} />
      </div>
    );
  }
});

export default DayPicker;
