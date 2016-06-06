import React from 'react';
import capitalize from 'lodash/capitalize';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { pure, skinnable } from '../utils';
import { MomentDate, Mode } from '../utils/model';
import { getWeekdaysMin } from '../utils/DateUtils.js';
import PickerTop from '../PickerTop';

@pure
@skinnable()
@props({
  changeMonth: t.Function,
  visibleDate: MomentDate,
  onChangeMode: t.Function,
  fixedMode: t.maybe(t.Boolean)
})
export default class DayPickerTop extends React.Component {

  onChangeMode = () => {
    if (!this.props.fixedMode) {
      this.props.onChangeMode(Mode('month'));
    }
  }

  getMonth = () => this.props.visibleDate.month()

  previousDate = () => this.props.changeMonth(this.getMonth() - 1)

  nextDate = () => this.props.changeMonth(this.getMonth() + 1)

  getLocals({ visibleDate, fixedMode }) {
    return {
      fixed: !!fixedMode,
      value: capitalize(visibleDate.format('MMMM YYYY')),
      handleClick: this.onChangeMode,
      previousDate: this.previousDate,
      nextDate: this.nextDate,
      weekDays: getWeekdaysMin()
    };
  }

  templateWeekDays = ({ weekDays }) => (
    <div className='week-days'>
      {weekDays.map((dayMin, i) => <div className='week-day' key={i}>{dayMin}</div>)}
    </div>
  )

  template({ weekDays, ...locales }) {
    return (
      <PickerTop
        {...locales}
        weekDays={this.templateWeekDays({ weekDays })}
      />
    );
  }
}
