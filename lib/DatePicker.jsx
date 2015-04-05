'use strict';

import React from 'react';
import moment from 'moment';
import DayPicker from './daypicker/DayPicker.jsx';
import MonthPicker from './monthpicker/MonthPicker.jsx';
import YearPicker from './yearpicker/YearPicker.jsx';

const DatePicker = React.createClass({

  propTypes: {
    onChange:         React.PropTypes.func.isRequired,
    startDate:        React.PropTypes.any,
    show:             React.PropTypes.bool,
    location:         React.PropTypes.string,
    startMode:        React.PropTypes.string,
    fixed:            React.PropTypes.bool,
    classNamePrefix:  React.PropTypes.string,
    visibleDate:      React.PropTypes.any
  },

  onChangeVisibleDate(date) {
    this.setState({visibleDate: date});
  },

  onChangeSelectedDate(date) {
    this.setState({
      visibleDate: date.clone(), // must be copy, otherwise they get linked
      date: date
    });
    this.props.onChange(date);
  },

  onChangeMode(mode) {
    this.setState({ mode });
  },

  getInitialState() {
    moment.locale(this.props.location);
    return {
      visibleDate: this.props.startDate ? moment(this.props.startDate) : moment(),
      mode: this.props.startMode || 'day'
    };
  },

  getDefaultProps() {
    return {
      classNamePrefix: 'datepicker',
      show: true,
      location: 'en'
    };
  },

  getDayPicker() {
    return (
      <DayPicker
        visibleDate={this.state.visibleDate}
        selectedDate={this.state.date}
        onChangeDate={this.onChangeVisibleDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeMode={this.onChangeMode}
        location={this.props.location}
        mode={this.state.mode}
        fixed={this.props.fixed}
        classNamePrefix={this.props.classNamePrefix}
      />
    );
  },

  getMonthPicker() {
    return (
      <MonthPicker
        visibleDate={this.state.visibleDate}
        selectedDate={this.state.date}
        onChangeDate={this.onChangeVisibleDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeMode={this.onChangeMode}
        location={this.props.location}
        mode={this.state.mode}
        fixed={this.props.fixed}
        classNamePrefix={this.props.classNamePrefix}
      />
    );
  },

  getYearPicker() {
    return (
      <YearPicker
        visibleDate={this.state.visibleDate}
        selectedDate={this.state.date}
        onChangeDate={this.onChangeVisibleDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeMode={this.onChangeMode}
        location={this.props.location}
        mode={this.state.mode}
        fixed={this.props.fixed}
        classNamePrefix={this.props.classNamePrefix}
      />
    );
  },

  render() {
    if (!this.props.show) {
      return <div/>;
    }

    let picker;
    switch (this.state.mode) {
      case 'day':
        picker = this.getDayPicker();
        break;

      case 'month':
        picker = this.getMonthPicker();
        break;

      case 'year':
        picker = this.getYearPicker();
        break;
    }

    return (
      <div className={this.props.classNamePrefix}>
        {picker}
      </div>
    );
  }
});

export default DatePicker;
