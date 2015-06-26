
import React from 'react';
import classNames from 'classnames';
import DateUtils from './utils/DateUtils.js';

const Picker = React.createClass({

  /* eslint-disable key-spacing */
  propTypes: {
    date:         React.PropTypes.any.isRequired,
    minDate:      DateUtils.evaluateDateProp,
    maxDate:      DateUtils.evaluateDateProp,
    isSelected:   React.PropTypes.bool.isRequired,
    isCurrent:    React.PropTypes.bool.isRequired,
    isEnabled:    React.PropTypes.bool.isRequired,
    isDisabled:   React.PropTypes.bool,
    onSelectDate: React.PropTypes.func.isRequired,
    mode:         React.PropTypes.string.isRequired
  },
  /* eslint-enable key-spacing */

  handleClick(e) {
    e.preventDefault();
    if (this.props.isEnabled) {
      this.props.onSelectDate(this.props.date);
    }
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

    const classes = classNames({
      [this.props.mode]: true,
      current: this.props.isCurrent,
      selected: this.props.isSelected,
      disabled: !this.props.isEnabled
    });

    return (
      <div className={'react-datepicker-picker react-datepicker-button ' + classes} onClick={this.handleClick}>
        <span>{value}</span>
      </div>
    );
  }
});

export default Picker;
