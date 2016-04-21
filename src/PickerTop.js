import React, { PropTypes } from 'react';
import cx from 'classnames';

export default React.createClass({
  propTypes: {
    fixed: PropTypes.bool,
    handleClick: PropTypes.func,
    nextDate: PropTypes.func,
    previousDate: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    valueClassName: PropTypes.string,
    weekDays: PropTypes.element
  },

  getDefaultProps() {
    return {
      handleClick: () => {},
      nextDate: () => {},
      previousDate: () => {}
    };
  },

  render() {
    return (
      <div className='react-datepicker-top'>
        <div className='display'>
          <div className='react-datepicker-button button-left'
            onClick={this.props.previousDate}
          >
            &lt;
          </div>
          <div className={cx('react-datepicker-button button-label', { fixed: this.props.fixed })}
            onClick={this.props.handleClick}
          >
            <strong className={this.props.valueClassName}>{this.props.value}</strong>
          </div>
          <div className='react-datepicker-button button-right'
            onClick={this.props.nextDate}
          >
            &gt;
          </div>
        </div>
        {this.props.weekDays}
      </div>
    );
  }
});
