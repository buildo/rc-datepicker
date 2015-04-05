'use strict';

import React, {PropTypes} from 'react';
import DateUtils from './utils/DateUtils.js';

export const Day = React.createClass({

  propTypes: {
    date:         PropTypes.any.isRequired,
    isSelected:   PropTypes.bool.isRequired,
    isCurrent:    PropTypes.bool.isRequired,
    onSelectDate: PropTypes.func.isRequired,
    mode:         PropTypes.string.isRequired,
    location:     PropTypes.string
  },

  handleClick(e) {
    e.preventDefault();
    this.props.onSelectDate(this.props.date);
  },

  render() {
    let formatMode;

    switch (this.props.mode) {
      case 'day':
        formatMode = 'D';
        break;

      case 'month':
        formatMode = 'MMM';
        break;

      case 'year':
        formatMode = 'YYYY';
        break;
    }
    const string = this.props.date.format(formatMode);
    const value = string.charAt(0).toUpperCase() + string.slice(1); // first letter always uppercase

    const classes = ('picker button ' + this.props.mode + (this.props.isCurrent ? ' current' : '') + (this.props.isSelected ? ' selected' : ''));
    return (
      <div className={classes} onClick={this.handleClick}>
        <span>{value}</span>
      </div>
    );
  }
});
