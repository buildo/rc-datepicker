import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { pure, skinnable } from '../utils';
import { MomentDate } from '../utils/model';
import PickerTop from '../PickerTop';

@pure
@skinnable()
@props({
  visibleDate: MomentDate,
  changeYear: t.Function,
  prevIconClassName: t.String,
  nextIconClassName: t.String
})
export default class YearPickerTop extends React.Component {

  getYear = () => this.props.visibleDate.year()

  previousDate = () => this.props.changeYear(this.getYear() - 10)

  nextDate = () => this.props.changeYear(this.getYear() + 10)

  getLocals({ prevIconClassName, nextIconClassName }) {
    const year = this.getYear();
    const startDecadeYear = parseInt(year / 10, 10) * 10;
    const endDecadeYear = startDecadeYear + 9;

    return {
      prevIconClassName,
      nextIconClassName,
      fixed: true,
      previousDate: this.previousDate,
      nextDate: this.nextDate,
      value: `${startDecadeYear}-${endDecadeYear}`
    };
  }

  template(locals) {
    return <PickerTop {...locals} />;
  }

}
