import React from 'react';
import cx from 'classnames';
import t from 'tcomb';
import { props } from 'tcomb-react';
import View from 'react-flexview';
import { pure, skinnable } from './utils';
import { MomentDate, Value, Mode } from './utils/model';

@pure
@skinnable()
@props({
  date: MomentDate,
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  isSelected: t.Boolean,
  isCurrent: t.Boolean,
  isEnabled: t.Boolean,
  isDisabled: t.maybe(t.Boolean),
  onSelectDate: t.Function,
  mode: Mode
})
export default class Picker extends React.Component {

  onClick = e => {
    e.preventDefault();
    if (this.props.isEnabled) {
      this.props.onSelectDate(this.props.date);
    }
  }

  getFormat = mode => {
    switch (mode) {
      case Mode('day'): return 'D';
      case Mode('month'): return 'MMM';
      case Mode('year'): return 'YYYY';
    }
  }

  getLocals({ date, mode, isCurrent, isSelected, isEnabled }) {
    const string = date.format(this.getFormat(mode));

    return {
      value: string.charAt(0).toUpperCase() + string.slice(1), // first letter always uppercase
      className: cx('react-datepicker-picker', {
        [mode]: true,
        current: isCurrent,
        selected: isSelected,
        disabled: !isEnabled
      }),
      onClick: this.onClick
    };
  }

  template({ className, onClick, value }) {
    return (
      <View
        {...{ className, onClick }}
        hAlignContent='center' vAlignContent='center'
        basis='100%' shrink height='100%'
      >
        <span>{value}</span>
      </View>
    );
  }
}
