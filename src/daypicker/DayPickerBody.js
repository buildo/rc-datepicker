import React from 'react';
import range from 'lodash/range';
import t from 'tcomb';
import { props } from 'tcomb-react';
import View from 'react-flexview';
import { Value, Mode, MomentDate } from '../utils/model';
import InvalidDate from '../InvalidDate';
import Picker from '../Picker';
import Row from '../Row';
import { isInsideTheEnabledArea, getVisibleDays } from '../utils/DateUtils';

const COLUMNS = 7;
const ROWS = 6;

@props({
  visibleDate: MomentDate,
  date: t.maybe(Value),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  onSelectDate: t.Function,
  mode: Mode
})
export default class DayPickerBody extends React.PureComponent {

  render() {
    const { date, visibleDate, minDate, maxDate, onSelectDate, mode } = this.props;
    
    if (!visibleDate.isValid()) {
      return <InvalidDate invalidDate={visibleDate.format()} />;
    }

    const year = visibleDate.year();
    const month = visibleDate.month();
    const selectedDateString = date ? date.format('DD/MM/YYYY') : undefined;

    const visibleDays = getVisibleDays(month, year);
    const pickers = visibleDays.days.map((dayOfMonth, index) => {
      const date = visibleDate.clone();
      const isCurrent = index >= visibleDays.startCurrent && index <= visibleDays.endCurrent;
      if (!isCurrent) {
        date.add(index < visibleDays.startCurrent ? -1 : 1, 'M');
      }
      date.date(dayOfMonth);
      const dateString = date.format('DD/MM/YYYY');
      return {
        date,
        isCurrent,
        onSelectDate,
        mode,
        isSelected: dateString === selectedDateString,
        isEnabled: isInsideTheEnabledArea(date, mode, minDate, maxDate),
        key: dateString
      };
    });

    const days = pickers.map(p => <Picker {...p} />);
    const rows = range(ROWS).map(index =>
      <Row pickers={days.slice(COLUMNS * index, COLUMNS * (index + 1))} mode={mode} key={index} />
    );

    return (
      <View column className='react-datepicker-body'>
        {rows}
      </View>
    );
  }
}
