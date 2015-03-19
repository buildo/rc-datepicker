/** @jsx React.DOM */

'use strict';

const React = require('react');
const DateUtils = require('./utils/DateUtils.js');

const Day = React.createClass(/** @lends {React.ReactComponent.prototype} */{

  propTypes: {
    date: React.PropTypes.any.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    isCurrent: React.PropTypes.bool.isRequired,
    onSelectDate: React.PropTypes.func.isRequired,
    mode: React.PropTypes.string.isRequired,
    location: React.PropTypes.string
  },

  handleClick: function(e) {
    e.preventDefault();
    this.props.onSelectDate(this.props.date);
  },

  render: function() {
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

module.exports = Day;