import React from 'react';
import capitalize from 'lodash/capitalize';
import t from 'tcomb';
import { props } from 'tcomb-react';
import View from 'react-flexview';
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
  fixedMode: t.maybe(t.Boolean),
  prevIconClassName: t.String,
  nextIconClassName: t.String
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

  getLocals({ visibleDate, fixedMode, prevIconClassName, nextIconClassName }) {
    return {
      fixed: !!fixedMode,
      value: capitalize(visibleDate.format('MMMM YYYY')),
      handleClick: this.onChangeMode,
      previousDate: this.previousDate,
      nextDate: this.nextDate,
      weekDays: getWeekdaysMin(),
      prevIconClassName,
      nextIconClassName
    };
  }

  templateWeekDays = ({ weekDays }) => (
    <View className='week-days' shrink={false}>
      {weekDays.map((dayMin, i) => (
        <View
          className='week-day' basis='100%' shrink
          hAlignContent='center' vAlignContent='center'
          key={i}
        >
          {dayMin}
        </View>
      ))}
    </View>
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
