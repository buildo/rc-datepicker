'use strict';

import React, {PropTypes} from 'react';
import moment from 'moment';,
import InvalidDate from '../InvalidDate.jsx';
import Picker from '../Picker.jsx';
import Row '../Row.jsx';
import DateUtils '../utils/DateUtils';

export const DayPicker = React.createClass({

    propTypes: {
      visibleDate:      PropTypes.any.isRequired,
      selectedDate:     PropTypes.any,
      onSelectDate:     PropTypes.func.isRequired,
      location:         PropTypes.string.isRequired,
      mode:             PropTypes.string.isRequired,
      classNamePrefix:  PropTypes.string.isRequired
    },

    render(){
      if (!this.props.visibleDate.isValid()) {
        return <InvalidDate invalidDate={this.props.visibleDate.format()} />;
      }
      const year = this.props.visibleDate.year();
      const month = this.props.visibleDate.month();
      const selectedMillis = this.props.selectedDate ? this.props.selectedDate.format('x') : -1;
      const visibleDays = DateUtils.getVisibleDays(month, year, this.props.location);

      const days = visibleDays.days.map((dayOfMonth, index) => {
        const _date = this.props.visibleDate.clone();
        const isCurrent = index >= visibleDays.startCurrent && index <= visibleDays.endCurrent;
        if (!isCurrent) {
          _date.add(index < visibleDays.startCurrent ? -1 : 1, 'M');
        }
        _date.date(dayOfMonth);
        return <Picker
          date={_date}
          isSelected={_date.format('x') === selectedMillis}
          isCurrent={isCurrent}
          onSelectDate={this.props.onSelectDate}
          mode={this.props.mode}
          key={index}
        />;
      });
      const nColumns = 7;
      const nRows = 6;
      const rows = Array.apply(null, Array(nRows)).map((n, index) =>
        <Row pickers={days.slice(nColumns * index, nColumns * (index + 1))} mode={this.props.mode} key={index} />);

      return (
        <div className='body'>
          {rows}
        </div>
      );
    }
});
