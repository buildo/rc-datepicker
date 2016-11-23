import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { pure, skinnable } from '../utils';
import { MomentDate, Mode } from '../utils/model';
import PickerTop from '../PickerTop';

@pure
@skinnable()
@props({
  visibleDate: MomentDate,
  onChangeMode: t.Function,
  changeYear: t.Function,
  fixedMode: t.maybe(t.Boolean),
  prevIconClassName: t.String,
  nextIconClassName: t.String
})
export default class MonthPickerTop extends React.Component {

  onChangeMode = () => {
    if (!this.props.fixedMode) {
      this.props.onChangeMode(Mode('year'));
    }
  }

  getYear = () => this.props.visibleDate.year()

  previousDate = () => this.props.changeYear(this.getYear() - 1)

  nextDate = () => this.props.changeYear(this.getYear() + 1)

  getLocals({ fixedMode }) {
    return {
      prevIconClassName: this.props.prevIconClassName,
      nextIconClassName: this.props.nextIconClassName,
      fixed: !!fixedMode,
      value: this.getYear(),
      handleClick: this.onChangeMode,
      previousDate: this.previousDate,
      nextDate: this.nextDate
    };
  }

  template(locales) {
    return <PickerTop {...locales} />;
  }
}
