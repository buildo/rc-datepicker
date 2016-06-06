import React from 'react';
import moment from 'moment';
import t from 'tcomb';
import { props } from 'tcomb-react';
import range from 'lodash/range';
import { pure, skinnable } from '../utils';
import { Value, Mode, MomentDate } from '../utils/model';
import { isInsideTheEnabledArea, getVisibleYears } from '../utils/DateUtils';
import InvalidDate from '../InvalidDate';
import Picker from '../Picker';
import Row from '../Row';

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
export default class YearPickerBody extends React.Component {

  getLocals({ date, visibleDate, minDate, maxDate, onSelectDate, mode }) {
    if (!visibleDate.isValid()) {
      return <InvalidDate invalidDate={visibleDate.format()} />;
    }
    const year = visibleDate.year();
    const selectedYear = date ? date.year() : -1;

    const visibleYears = getVisibleYears(year);
    const pickers = visibleYears.years.map((_year, index) => {
      const date = moment([_year, 0, 1]);
      const isCurrent = index >= visibleYears.startCurrent && index <= visibleYears.endCurrent;
      return {
        date,
        onSelectDate,
        mode,
        isCurrent,
        isSelected: selectedYear === _year,
        isEnabled: isInsideTheEnabledArea(date, mode, minDate, maxDate),
        key: index
      };
    });

    return { pickers, mode };
  }

  templateYears = ({ pickers }) => pickers.map(p => <Picker {...p} />)

  template({ pickers, mode }) {
    const years = this.templateYears({ pickers });
    const rows = range(ROWS).map(index =>
      <Row pickers={years.slice(COLUMNS * index, COLUMNS * (index + 1))} mode={mode} key={index} />
    );

    return (
      <div className='react-datepicker-body'>
        {rows}
      </div>
    );
  }
}
