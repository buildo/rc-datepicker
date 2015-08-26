import React, {PropTypes} from 'react';
import partial from 'lodash/function/partial';
import capitalize from 'lodash/string/capitalize';
import DateUtils from '../utils/DateUtils.js';
import PickerTop from '../PickerTop';

export default React.createClass({

  displayName: 'DayPickerTop',

  propTypes: {
    initialVisibleDate: PropTypes.any.isRequired,
    onChangeVisibleDate: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    fixedMode: PropTypes.bool
  },

  getInitialState() {
    return { visibleDate: this.props.initialVisibleDate.clone() };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ visibleDate: nextProps.initialVisibleDate });
  },

  changeMonth(month) {
    this.setState({
      visibleDate: this.state.visibleDate.clone().month(month)
    }, () => this.props.onChangeVisibleDate(this.state.visibleDate));
  },

  changeMode() {
    if (!this.props.fixedMode) {
      this.props.onChangeMode('month');
    }
  },

  render() {
    const month = this.state.visibleDate.month();
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
    const monthValue = capitalize(this.state.visibleDate.format('MMMM YYYY'));

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
