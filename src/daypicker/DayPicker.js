import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import View from 'react-flexview';
import { Value, Mode, MomentDate } from '../utils/model';
import DayPickerTop from './DayPickerTop';
import DayPickerBody from './DayPickerBody';

@props({
  changeMonth: t.Function,
  visibleDate: MomentDate,
  date: t.maybe(Value),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  onSelectDate: t.Function,
  onChangeMode: t.Function,
  mode: Mode,
  fixedMode: t.maybe(t.Boolean),
  prevIconClassName: t.String,
  nextIconClassName: t.String
})
export default class DayPicker extends React.PureComponent {

  render() {
    const {
      date, visibleDate, onSelectDate, minDate,
      maxDate, changeMonth, onChangeMode, mode, fixedMode,
      prevIconClassName, nextIconClassName
    } = this.props;
    
    const dayPickerTopProps = {
      visibleDate,
      changeMonth,
      onChangeMode,
      fixedMode,
      prevIconClassName,
      nextIconClassName
    };
    const dayPickerBodyProps = {
      date, visibleDate,
      minDate, maxDate,
      onSelectDate,
      mode
    }

    return (
      <View column className='react-datepicker-container day'>
        <DayPickerTop {...dayPickerTopProps} />
        <DayPickerBody {...dayPickerBodyProps} />
      </View>
    );
  }
}
