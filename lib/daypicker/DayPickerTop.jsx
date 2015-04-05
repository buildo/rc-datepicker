'use strict';

import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import DateUtils from '../utils/DateUtils.js';

const DayPickerTop = React.createClass({

  propTypes: {
    visibleDate:      React.PropTypes.any.isRequired,
    onChangeDate:     React.PropTypes.func.isRequired,
    onChangeMode:     React.PropTypes.func.isRequired,
    classNamePrefix:  React.PropTypes.string.isRequired,
    fixed:            React.PropTypes.bool,
    location:         React.PropTypes.string.isRequired
  },

  changeMonth(month) {
    this.props.visibleDate.month(month);
    this.props.onChangeDate(this.props.visibleDate);
  },

  changeYear(year) {
    this.props.visibleDate.year(year);
    this.props.onChangeDate(this.props.visibleDate);
  },

  changeMode() {
    if (!this.props.fixed) {
      this.props.onChangeMode('month');
    }
  },

  render() {
    const month = this.props.visibleDate.month();
    const daysMin = moment.weekdaysMin().map((dayMin, index) => <p className='week-day' key={index}>{dayMin}</p>);

    const string = this.props.visibleDate.format('MMMM YYYY');
    const monthValue = string.charAt(0).toUpperCase() + string.slice(1); // first letter always uppercase
    return (
      <div className='top'>
        <div className='display'>
          <div className='button left' onClick={_.partial(this.changeMonth, (month - 1))}>
            &lt;
          </div>
          <div className={'button label' + (this.props.fixed? ' fixed' : '')} onClick={this.changeMode}>
            <strong className={this.props.textClassNames}>{monthValue}</strong>
          </div>
          <div className='button right' onClick={_.partial(this.changeMonth, (month + 1))}>
            &gt;
          </div>
        </div>
        <div className='week-days'>
          {daysMin}
        </div>
      </div>
    );
  }
});

export default DayPickerTop;
