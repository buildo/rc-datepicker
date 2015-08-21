import React, {PropTypes} from 'react';
import partial from 'lodash/function/partial';
import DateUtils from '../utils/DateUtils.js';

const DayPickerTop = React.createClass({

  propTypes: {
    visibleDate: PropTypes.any.isRequired,
    onChangeVisibleDate: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    fixedMode: PropTypes.bool
  },

  changeMonth(month) {
    this.props.visibleDate.month(month);
    this.props.onChangeVisibleDate(this.props.visibleDate);
  },

  changeYear(year) {
    this.props.visibleDate.year(year);
    this.props.onChangeVisibleDate(this.props.visibleDate);
  },

  changeMode() {
    if (!this.props.fixedMode) {
      this.props.onChangeMode('month');
    }
  },

  render() {
    const month = this.props.visibleDate.month();
    const daysMin = DateUtils
      .getWeekdaysMin(this.props.locale)
      .map((dayMin, index) => <div className='week-day' key={index}>{dayMin}</div>);

    const string = this.props.visibleDate.format('MMMM YYYY');
    const monthValue = string.charAt(0).toUpperCase() + string.slice(1); // first letter always uppercase

    const fixed = this.props.fixedMode ? 'fixed' : '';
    return (
      <div className='react-datepicker-top'>
        <div className='display'>
          <div className='react-datepicker-button button-left' onClick={partial(this.changeMonth, (month - 1))}>
            &lt;
          </div>
          <div className={`react-datepicker-button button-label ${fixed}`} onClick={this.changeMode}>
            <strong className={this.props.textClassNames}>{monthValue}</strong>
          </div>
          <div className='react-datepicker-button button-right' onClick={partial(this.changeMonth, (month + 1))}>
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
