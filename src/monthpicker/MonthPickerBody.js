import React from 'react';
import moment from 'moment';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { pure, skinnable } from '../utils';
import { Value, Mode, MomentDate } from '../utils/model';
import InvalidDate from '../InvalidDate';
import Picker from '../Picker';
import Row from '../Row';
import { isInsideTheEnabledArea } from '../utils/DateUtils';
import range from 'lodash/range';

const COLUMNS = 4;
const ROWS = 3;

@pure
@skinnable()
@props({
  visibleDate: MomentDate,
  date: t.maybe(Value),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  onSelectDate: t.Function,
  mode: Mode
})
export default class MonthPickerBody extends React.Component {

  getLocals({ date, visibleDate, minDate, maxDate, onSelectDate, mode }) {
    if (!visibleDate.isValid()) {
      return <InvalidDate invalidDate={visibleDate.format()} />;
    }
    const year = visibleDate.year();
    const selectedMonth = date ? date.month() : -1;
    const selectedYear = date ? date.year() : -1;
    const pickers = moment.months().map((_, index) => {
      const date = moment([year, index, 1]);
      return {
        date,
        onSelectDate,
        mode,
        isCurrent: true,
        isSelected: selectedMonth === index && selectedYear === year,
        isEnabled: isInsideTheEnabledArea(date, mode, minDate, maxDate),
        key: index
      };
    });

    return { pickers, mode };
  }

  templateMonths = ({ pickers }) => pickers.map(p => <Picker {...p} />)

  template({ pickers, mode }) {
    const months = this.templateMonths({ pickers });
    const rows = range(ROWS).map(index => (
      <Row
        pickers={months.slice(COLUMNS * index, COLUMNS * (index + 1))}
        mode={mode}
        key={index}
      />
    ));

    return (
      <div className='react-datepicker-body'>
        {rows}
      </div>
    );
  }
}
