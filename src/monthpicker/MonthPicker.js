import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from '../utils';
import { MomentDate, Value, Mode } from '../utils/model';
import MonthPickerTop from './MonthPickerTop';
import MonthPickerBody from './MonthPickerBody';

@skinnable()
@props({
  changeYear: t.Function,
  visibleDate: MomentDate,
  date: t.maybe(Value),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  onChangeVisibleDate: t.Function,
  onSelectDate: t.Function,
  onChangeMode: t.Function,
  mode: Mode,
  fixedMode: t.maybe(t.Boolean),
  prevIconClassName: t.String,
  nextIconClassName: t.String
})
export default class MonthPicker extends React.PureComponent {

  onSelectDate = (date) => {
    const { fixedMode, onSelectDate, onChangeMode, onChangeVisibleDate } = this.props;
    if (fixedMode) {
      onSelectDate(date);
    } else {
      onChangeVisibleDate(date);
      onChangeMode(Mode('day'));
    }
  }

  getLocals({
    date, visibleDate, minDate,
    maxDate, changeYear, onChangeMode, mode, fixedMode,
    prevIconClassName, nextIconClassName
  }) {
    return {
      monthPickerTopProps: {
        visibleDate,
        changeYear,
        onChangeMode,
        fixedMode,
        prevIconClassName,
        nextIconClassName
      },
      monthPickerBodyProps: {
        date, visibleDate,
        minDate, maxDate,
        mode,
        onSelectDate: this.onSelectDate
      }
    };
  }

  template({ monthPickerTopProps, monthPickerBodyProps }) {
    return (
      <div className='react-datepicker-container month'>
        <MonthPickerTop {...monthPickerTopProps} />
        <MonthPickerBody {...monthPickerBodyProps} />
      </div>
    );
  }
}
