'use strict';

import React from 'react';
import moment from 'moment';
import InvalidDate from '../InvalidDate.jsx';
import Picker from '../Picker.jsx';
import Row from '../Row.jsx';
import DateUtils from '../utils/DateUtils';

const MonthPickerBody = React.createClass({

    propTypes: {
      visibleDate:  React.PropTypes.any.isRequired,
      date:         DateUtils.evaluateDateProp,
      minDate:      DateUtils.evaluateDateProp,
      maxDate:      DateUtils.evaluateDateProp,
      onSelectDate: React.PropTypes.func.isRequired,
      locale:       React.PropTypes.string.isRequired,
      mode:         React.PropTypes.string.isRequired,
      className:    React.PropTypes.string.isRequired
    },

    render() {
      if (!this.props.visibleDate.isValid()) {
        return <InvalidDate invalidDate={this.props.visibleDate.format()} />;
      }
      const year = this.props.visibleDate.year();
      const selectedMonth = this.props.date ? this.props.date.month() : -1;
      const selectedYear = this.props.date ? this.props.date.year() : -1;
      const months = moment.months().map((_month, index) => {
        const date = moment([year, index, 1]);
        return <Picker
          date={date}
          isSelected={selectedMonth === index && selectedYear === year}
          isCurrent={true}
          isEnabled={DateUtils.isInsideTheEnabledArea(date, this.props.minDate, this.props.maxDate)}
          onSelectDate={this.props.onSelectDate}
          locale={this.props.locale}
          mode={this.props.mode}
          key={index}
        />;
      });
      const nColumns = 4;
      const nRows = 3;
      const rows = Array.apply(null, Array(nRows)).map((n, index) =>
        <Row pickers={months.slice(nColumns * index, nColumns * (index + 1))} mode={this.props.mode} key={index} />);

      return (
        <div className='body'>
          {rows}
        </div>
      );
    }
});

export default MonthPickerBody;
