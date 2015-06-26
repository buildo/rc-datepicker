'use strict';

import React from 'react/addons';
import moment from 'moment';
import DateUtils from './utils/DateUtils.js';
import DayPicker from './daypicker/DayPicker.jsx';
import MonthPicker from './monthpicker/MonthPicker.jsx';
import YearPicker from './yearpicker/YearPicker.jsx';

const DatePicker = React.createClass({

  propTypes: {
    onChange:    React.PropTypes.func.isRequired,
    date:        DateUtils.evaluateDateProp,
    initialDate: DateUtils.evaluateDateProp,
    minDate:     DateUtils.evaluateDateProp,
    maxDate:     DateUtils.evaluateDateProp,
    locale:      React.PropTypes.string,
    startMode:   React.PropTypes.string,
    fixedMode:   React.PropTypes.bool,
    floating:    React.PropTypes.bool,
    className:   React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      className: '',
      startMode: 'day',
      locale: 'en'
    };
  },

  getInitialState() {
    moment.locale(this.props.locale);
    return this.getStateFromProps(this.props);
  },

  getStateFromProps(_props) {
    const date = typeof _props.date === 'string' ? moment(_props.date, this.getFormat(), true) : moment(_props.date);
    const initialDate = typeof _props.initialDate === 'string' ? moment(_props.initialDate, this.getFormat(), true) : moment(_props.initialDate);
    const visibleDate = _props.date ? date.clone() : initialDate; // must be copy, otherwise they get linked
    return {
      date: _props.date ? date.clone() : undefined,
      visibleDate: visibleDate,
      mode: _props.startMode
    };
  },

  onChangeVisibleDate(date) {
    this.setState({visibleDate: date});
  },

  onChangeSelectedDate(date) {
    this.setState({
      visibleDate: date.clone(), // must be copy, otherwise they get linked
      date: date
    });
    this.props.onChange(date.toDate());
  },

  onChangeMode(mode) {
    this.setState({ mode });
  },

  getDayPicker() {
    return (
      <DayPicker
        date={this.state.date}
        visibleDate={this.state.visibleDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onChangeVisibleDate={this.onChangeVisibleDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeMode={this.onChangeMode}
        locale={this.props.locale}
        mode={this.state.mode}
        fixedMode={this.props.fixedMode}
        className={this.props.className}
      />
    );
  },

  getMonthPicker() {
    return (
      <MonthPicker
        date={this.state.date}
        visibleDate={this.state.visibleDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onChangeVisibleDate={this.onChangeVisibleDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeMode={this.onChangeMode}
        locale={this.props.locale}
        mode={this.state.mode}
        fixedMode={this.props.fixedMode}
        className={this.props.className}
      />
    );
  },

  getYearPicker() {
    return (
      <YearPicker
        date={this.state.date}
        visibleDate={this.state.visibleDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onChangeVisibleDate={this.onChangeVisibleDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeMode={this.onChangeMode}
        locale={this.props.locale}
        mode={this.state.mode}
        fixedMode={this.props.fixedMode}
        className={this.props.className}
      />
    );
  },

  render() {
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

    const floating = this.props.floating ? 'floating' : '';
    return (
      <div className={`react-datepicker ${floating} ${this.props.className}`}>
        {picker}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.date) {
      this.setState(this.getStateFromProps(nextProps));
    }
  },

});

export default DatePicker;
