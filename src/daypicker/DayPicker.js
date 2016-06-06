import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { pure, skinnable } from '../utils';
import { Value, Mode, MomentDate } from '../utils/model';
import DayPickerTop from './DayPickerTop';
import DayPickerBody from './DayPickerBody';

@pure
@skinnable()
@props({
  changeMonth: t.Function,
  visibleDate: MomentDate,
  date: t.maybe(Value),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  onSelectDate: t.Function,
  onChangeMode: t.Function,
  mode: Mode,
  fixedMode: t.maybe(t.Boolean)
})
export default class DayPicker extends React.Component {

  getLocals({
    date, visibleDate, onSelectDate, minDate,
    maxDate, changeMonth, onChangeMode, mode, fixedMode
  }) {
    return {
      dayPickerTopProps: {
        visibleDate,
        changeMonth,
        onChangeMode,
        fixedMode
      },
      dayPickerBodyProps: {
        date, visibleDate,
        minDate, maxDate,
        onSelectDate,
        mode
      }
    };
  }

  template({ dayPickerTopProps, dayPickerBodyProps }) {
    return (
      <div className='react-datepicker-container day'>
        <DayPickerTop {...dayPickerTopProps} />
        <DayPickerBody {...dayPickerBodyProps} />
      </div>
    );
  }
}
