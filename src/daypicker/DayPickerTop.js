import React from 'react';
import capitalize from 'lodash/capitalize';
import t from 'tcomb';
import { props } from 'tcomb-react';
import View from 'react-flexview';
import { MomentDate, Mode } from '../utils/model';
import { getWeekdaysMin } from '../utils/DateUtils.js';
import PickerTop from '../PickerTop';

@props({
  changeMonth: t.Function,
  visibleDate: MomentDate,
  onChangeMode: t.Function,
  fixedMode: t.maybe(t.Boolean),
  prevIconClassName: t.String,
  nextIconClassName: t.String
})
export default class DayPickerTop extends React.PureComponent {

  onChangeMode = () => {
    if (!this.props.fixedMode) {
      this.props.onChangeMode(Mode('month'));
    }
  }

  getMonth = () => this.props.visibleDate.month()

  previousDate = () => this.props.changeMonth(this.getMonth() - 1)

  nextDate = () => this.props.changeMonth(this.getMonth() + 1)

  render() {
    const { visibleDate, fixedMode, prevIconClassName, nextIconClassName } = this.props;

    const value = capitalize(visibleDate.format('MMMM YYYY'));
    const weekDays = <View className='week-days' shrink={false}>
      {getWeekdaysMin().map((dayMin, i) => (
        <View
          className='week-day' basis='100%' shrink
          hAlignContent='center' vAlignContent='center'
          key={i}
        >
          {dayMin}
        </View>
      ))}
    </View>;

    return (
      <PickerTop
        fixed={!!fixedMode}
        value={value}
        handleClick={this.onChangeMode}
        previousDate={this.previousDate}
        nextDate={this.nextDate}
        prevIconClassName={prevIconClassName}
        nextIconClassName={nextIconClassName}
        weekDays={this.templateWeekDays({ weekDays })}
      />
    );
  }
}
