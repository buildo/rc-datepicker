'use strict';

import React, {PropTypes} from 'react';
import MonthPickerTop from './MonthPickerTop.jsx';
import MonthPickerBody from './MonthPickerBody.jsx';

export const MonthPicker = React.createClass({

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
    if (this.props.fixed) {
      this.props.onSelectDate(date);
    } else {
      this.props.onChangeDate(date);
      this.props.onChangeMode('day');
    }
  },

  render() {
    return (
      <div className={this.props.classNamePrefix + ' container month'}>
        <MonthPickerTop
          visibleDate={this.props.visibleDate}
          onChangeDate={this.props.onChangeDate}
          onChangeMode={this.props.onChangeMode}
          fixed={this.props.fixed}
          classNamePrefix={this.props.classNamePrefix} />
        <MonthPickerBody
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
