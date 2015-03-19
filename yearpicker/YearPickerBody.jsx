/** @jsx React.DOM */

'use strict';

const React = require('react'),
  moment = require('moment'),
  InvalidDate = require('../InvalidDate.jsx'),
  Picker = require('../Picker.jsx'),
  Row = require('../Row.jsx'),
  DateUtils = require('../utils/DateUtils');

const MonthPicker = React.createClass(/** @lends {React.ReactComponent.prototype} */{

    propTypes: {
      visibleDate: React.PropTypes.any.isRequired,
      selectedDate: React.PropTypes.any,
      onSelectDate: React.PropTypes.func.isRequired,
      mode: React.PropTypes.string.isRequired,
      classNamePrefix: React.PropTypes.string.isRequired
    },

    render: function (){
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

module.exports = MonthPicker;