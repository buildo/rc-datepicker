'use strict';

import React, {PropTypes} from 'react';
import YearPickerTop from './YearPickerTop.jsx';
import YearPickerBody from './YearPickerBody.jsx';

export const YearPicker = React.createClass({

  propTypes: {
    visibleDate:      PropTypes.any.isRequired,
    selectedDate:     PropTypes.any,
    onChangeDate:     PropTypes.func.isRequired,
    onSelectDate:     PropTypes.func.isRequired,
    onChangeMode:     PropTypes.func.isRequired,
    mode:             PropTypes.string.isRequired,
    fixed:            PropTypes.bool,
    classNamePrefix:  PropTypes.string.isRequired
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
