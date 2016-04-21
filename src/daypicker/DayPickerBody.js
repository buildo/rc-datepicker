import React, { PropTypes } from 'react';
import InvalidDate from '../InvalidDate';
import Picker from '../Picker';
import Row from '../Row';
import DateUtils from '../utils/DateUtils';
import range from 'lodash/range';

const DayPickerBody = React.createClass({

  propTypes: {
    visibleDate: PropTypes.any.isRequired,
    date: DateUtils.evaluateDateProp,
    minDate: DateUtils.evaluateDateProp,
    maxDate: DateUtils.evaluateDateProp,
    onSelectDate: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired
  },

  render() {
    if (!this.props.visibleDate.isValid()) {
      return <InvalidDate invalidDate={this.props.visibleDate.format()} />;
    }
    const year = this.props.visibleDate.year();
    const month = this.props.visibleDate.month();
    const selectedDate = this.props.date ? this.props.date.format('DD/MM/YYYY') : undefined;

    const visibleDays = DateUtils.getVisibleDays(month, year);
    const days = visibleDays.days.map((dayOfMonth, index) => {
      const date = this.props.visibleDate.clone();
      const isCurrent = index >= visibleDays.startCurrent && index <= visibleDays.endCurrent;
      if (!isCurrent) {
        date.add(index < visibleDays.startCurrent ? -1 : 1, 'M');
      }
      date.date(dayOfMonth);
      return (
        <Picker
          date={date}
          isSelected={date.format('DD/MM/YYYY') === selectedDate}
          isCurrent={isCurrent}
          isEnabled={DateUtils.isInsideTheEnabledArea(date, this.props.mode, this.props.minDate, this.props.maxDate)}
          onSelectDate={this.props.onSelectDate}
          mode={this.props.mode}
          key={index}
        />
      );
    });
    const nColumns = 7;
    const nRows = 6;
    const rows = range(nRows).map(index =>
      <Row pickers={days.slice(nColumns * index, nColumns * (index + 1))} mode={this.props.mode} key={index} />
    );

    return (
      <div className='react-datepicker-body'>
        {rows}
      </div>
    );
  }
});

export default DayPickerBody;
