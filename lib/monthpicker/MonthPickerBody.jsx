'use strict';

import React from 'react';
import moment from 'moment';
import InvalidDate from '../InvalidDate.jsx';
import Picker from '../Picker.jsx';
import Row from '../Row.jsx';
import DateUtils from '../utils/DateUtils';

const MonthPickerBody = React.createClass({

    propTypes: {
      visibleDate:      React.PropTypes.any.isRequired,
      selectedDate:     React.PropTypes.any,
      onSelectDate:     React.PropTypes.func.isRequired,
      location:         React.PropTypes.string.isRequired,
      mode:             React.PropTypes.string.isRequired,
      classNamePrefix:  React.PropTypes.string.isRequired
    },

    render() {
      if (!this.props.visibleDate.isValid()) {
        return <InvalidDate invalidDate={this.props.visibleDate.format()} />;
      }
      const year = this.props.visibleDate.year();
      const selectedMonth = this.props.selectedDate ? this.props.selectedDate.month() : -1;
      const selectedYear = this.props.selectedDate ? this.props.selectedDate.year() : -1;
      const months = moment.months().map((_month, index) => {
        return <Picker
          date={moment([year, index, 1])}
          isSelected={selectedMonth === index && selectedYear === year}
          isCurrent={true}
          onSelectDate={this.props.onSelectDate}
          location={this.props.location}
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
