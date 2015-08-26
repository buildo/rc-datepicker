import React, {PropTypes} from 'react';
import partial from 'lodash/function/partial';
import DateUtils from '../utils/DateUtils.js';
import PickerTop from '../PickerTop';

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
    const weekDays = (
      <div className='week-days'>
        {
          DateUtils
          .getWeekdaysMin(this.props.locale)
          .map((dayMin, index) => <div className='week-day' key={index}>{dayMin}</div>)
        }
      </div>
    );


    const string = this.props.visibleDate.format('MMMM YYYY');
    const monthValue = string.charAt(0).toUpperCase() + string.slice(1); // first letter always uppercase

    return (
      <PickerTop
        fixed={this.props.fixedMode}
        value={monthValue}
        handleClick={this.changeMode}
        previousDate={partial(this.changeMonth, (month - 1))}
        nextDate={partial(this.changeMonth, (month + 1))}
        valueClassName={this.props.textClassNames}
        weekDays={weekDays} />
    );
  }
});

export default DayPickerTop;
