'use strict';

import React, {PropTypes} from 'react';
import DayPickerTop './DayPickerTop.jsx';
import DayPickerBody './DayPickerBody.jsx';

export const DayPicker = React.createClass({

  propTypes: {
    visibleDate:      PropTypes.any.isRequired,
    selectedDate:     PropTypes.any,
    onChangeDate:     PropTypes.func.isRequired,
    onSelectDate:     PropTypes.func.isRequired,
    onChangeMode:     PropTypes.func.isRequired,
    location:         PropTypes.string.isRequired,
    mode:             PropTypes.string.isRequired,
    fixed:            PropTypes.bool,
    classNamePrefix:  PropTypes.string.isRequired
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
