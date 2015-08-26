import React, {PropTypes} from 'react';
import partial from 'lodash/function/partial';
import capitalize from 'lodash/string/capitalize';
import DateUtils from '../utils/DateUtils.js';
import PickerTop from '../PickerTop';

export default React.createClass({

  displayName: 'DayPickerTop',

  propTypes: {
    visibleDate: PropTypes.any.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    fixedMode: PropTypes.bool
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
          .map((dayMin, index) =>
            <div className='week-day' key={index}>{dayMin}</div>
          )
        }
      </div>
    );
    const monthValue = capitalize(this.props.visibleDate.format('MMMM YYYY'));

    return (
      <PickerTop
        fixed={this.props.fixedMode}
        value={monthValue}
        handleClick={this.changeMode}
        previousDate={partial(this.props.changeMonth, (month - 1))}
        nextDate={partial(this.props.changeMonth, (month + 1))}
        valueClassName={this.props.textClassNames}
        weekDays={weekDays} />
    );
  }
});
