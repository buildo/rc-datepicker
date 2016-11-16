import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import View from 'react-flexview';
import { pure, skinnable } from '../utils';
import { MomentDate, Value, Mode } from '../utils/model';
import YearPickerTop from './YearPickerTop';
import YearPickerBody from './YearPickerBody';

@pure
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
export default class YearPicker extends React.Component {

  onSelectDate = (date) => {
    const { fixedMode, onSelectDate, onChangeMode, onChangeVisibleDate } = this.props;
    if (fixedMode) {
      onSelectDate(date);
    } else {
      onChangeVisibleDate(date);
      onChangeMode(Mode('month'));
    }
  }

  getLocals({
    date, visibleDate, minDate,
    maxDate, changeYear, mode,
    prevIconClassName, nextIconClassName
  }) {
    return {
      yearPickerTopProps: {
        visibleDate,
        changeYear,
        prevIconClassName,
        nextIconClassName
      },
      yearPickerBodyProps: {
        date, visibleDate,
        minDate, maxDate,
        mode,
        onSelectDate: this.onSelectDate
      }
    };
  }

  template({ yearPickerTopProps, yearPickerBodyProps }) {
    return (
      <View column className='react-datepicker-container year'>
        <YearPickerTop {...yearPickerTopProps} />
        <YearPickerBody {...yearPickerBodyProps} />
      </View>
    );
  }
}
