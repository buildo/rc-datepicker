'use strict';

import React, {PropTypes} from 'react';
import moment from 'moment';
import InvalidDate from '../InvalidDate.jsx';
import Picker from '../Picker.jsx';
import Row from '../Row.jsx';
import DateUtils from '../utils/DateUtils';

export const MonthPicker = React.createClass({

    propTypes: {
      visibleDate:      PropTypes.any.isRequired,
      selectedDate:     PropTypes.any,
      onSelectDate:     PropTypes.func.isRequired,
      mode:             PropTypes.string.isRequired,
      classNamePrefix:  PropTypes.string.isRequired
    },

    render() {
      if (!this.props.visibleDate.isValid()) {
        return <InvalidDate invalidDate={this.props.visibleDate.format()} />;
      }
      const year = this.props.visibleDate.year();
      const selectedYear = this.props.selectedDate ? this.props.selectedDate.year() : -1;

      const visibleYears = DateUtils.getVisibleYears(year);
      const years = visibleYears.years.map((_year, index) => {
        const isCurrent = index >= visibleYears.startCurrent && index <= visibleYears.endCurrent;
        return <Picker
          date={moment([_year, 0, 1])}
          isSelected={selectedYear === _year}
          isCurrent={isCurrent}
          onSelectDate={this.props.onSelectDate}
          mode={this.props.mode}
          key={index}
        />;
      });
      const nColumns = 4;
      const nRows = 3;
      const rows = Array.apply(null, Array(nRows)).map((n, index) =>
        <Row pickers={years.slice(nColumns * index, nColumns * (index + 1))} mode={this.props.mode} key={index} />);

      return (
        <div className='body'>
          {rows}
        </div>
      );
    }
});
