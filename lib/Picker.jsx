'use strict';

import React from 'react';
import DateUtils from './utils/DateUtils.js';

const Picker = React.createClass({

  propTypes: {
    date:         React.PropTypes.any.isRequired,
    isSelected:   React.PropTypes.bool.isRequired,
    isCurrent:    React.PropTypes.bool.isRequired,
    isDisabled:   React.PropTypes.bool,
    onSelectDate: React.PropTypes.func.isRequired,
    mode:         React.PropTypes.string.isRequired
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

export default Picker;
