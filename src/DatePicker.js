import React, { PropTypes } from 'react';
import moment from 'moment';
import DateUtils from './utils/DateUtils.js';
import formatMixin from './utils/formatMixin';
import DayPicker from './daypicker/DayPicker';
import MonthPicker from './monthpicker/MonthPicker';
import YearPicker from './yearpicker/YearPicker';
import ValueLinkMixin from './utils/ValueLinkMixin';
import cx from 'classnames';

const DatePicker = React.createClass({

  propTypes: {
    onChange: PropTypes.func,
    value: DateUtils.evaluateDateProp,
    valueLink: PropTypes.shape({
      value: DateUtils.evaluateDateProp,
      requestChange: React.PropTypes.func.isRequired
    }),
    defaultValue: DateUtils.evaluateDateProp,
    minDate: DateUtils.evaluateDateProp,
    maxDate: DateUtils.evaluateDateProp,
    locale: PropTypes.string,
    startMode: PropTypes.string,
    fixedMode: PropTypes.bool,
    returnFormat: PropTypes.string,
    floating: PropTypes.bool,
    closeOnClickOutside: PropTypes.bool, // used only with DatePickerInput
    className: PropTypes.string,
    style: PropTypes.object
  },

  mixins: [ ValueLinkMixin, formatMixin ],

  getDefaultProps() {
    return {
      startMode: 'day',
      className: '',
      style: {}
    };
  },

  getInitialState() {
    if (this.props.locale) {
      moment.locale(this.props.locale);
      if (process.env.NODE_ENV !== 'production' && moment.locale() !== this.props.locale) {
        console.warn(`Setting "${this.props.locale}" as locale failed. Did you import it correctly?`); // eslint-disable-line no-console
      }
    }
    return this.getStateFromProps(this.props);
  },

  getStateFromProps(_props) {
    const { value } = this.getValueLink(_props);
    const { defaultValue, startMode } = _props;
    const date = typeof value === 'string' ? this.parsePropDateString(value) : moment(value);
    const initialDate = typeof defaultValue === 'string' ? this.parsePropDateString(defaultValue) : moment(defaultValue);

    const visibleDate = value ? date.clone() : initialDate; // must be copy, otherwise they get linked
    return {
      date: value ? date.clone() : undefined,
      visibleDate,
      mode: startMode
    };
  },

  onChangeVisibleDate(date) {
    this.setState({ visibleDate: date });
  },

  onChangeSelectedDate(date) {
    this.setState({
      visibleDate: date.clone(), // must be copy, otherwise they get linked
      date
    }, () => this.getValueLink().requestChange(date.toDate()));
  },

  onChangeMode(mode) {
    setTimeout(() => this.setState({ mode }));
  },

  changeYear(year) {
    this.setState({ visibleDate: this.state.visibleDate.clone().year(year) });
  },

  changeMonth(month) {
    this.setState({ visibleDate: this.state.visibleDate.clone().month(month) });
  },

  getDayPicker() {
    return (
      <DayPicker
        changeMonth={this.changeMonth}
        date={this.state.date}
        visibleDate={this.state.visibleDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeMode={this.onChangeMode}
        mode={this.state.mode}
        fixedMode={this.props.fixedMode}
        className={this.props.className}
      />
    );
  },

  getMonthPicker() {
    return (
      <MonthPicker
        changeYear={this.changeYear}
        date={this.state.date}
        visibleDate={this.state.visibleDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeVisibleDate={this.onChangeVisibleDate}
        onChangeMode={this.onChangeMode}
        mode={this.state.mode}
        fixedMode={this.props.fixedMode}
        className={this.props.className}
      />
    );
  },

  getYearPicker() {
    return (
      <YearPicker
        changeYear={this.changeYear}
        date={this.state.date}
        visibleDate={this.state.visibleDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        onSelectDate={this.onChangeSelectedDate}
        onChangeVisibleDate={this.onChangeVisibleDate}
        onChangeMode={this.onChangeMode}
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

    return (
      <div
        className={cx('react-datepicker', this.props.className, { floating: this.props.floating } )}
        style={this.props.style}
      >
        {picker}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (this.getValueLink(nextProps).value !== this.getValueLink().value) {
      this.setState(this.getStateFromProps(nextProps));
    }
  }

});

export default DatePicker;
