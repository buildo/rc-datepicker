import React, { PropTypes } from 'react/addons';
import moment from 'moment';
import DateUtils from './utils/DateUtils.js';
import formatMixin from './utils/formatMixin';
import DayPicker from './daypicker/DayPicker';
import MonthPicker from './monthpicker/MonthPicker';
import YearPicker from './yearpicker/YearPicker';

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

  mixins: [ formatMixin ],

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
        console.warn(`Setting "${this.props.locale}" as locale failed. Did you import it correctly?`);
      }
    }
    return this.getStateFromProps(this.props);
  },

  getStateFromProps(_props) {
    const value = this.getValue(_props);
    const { defaultValue, startMode } = _props;
    const date = typeof value === 'string' ? this.parsePropDateString(value) : moment(value);
    const initialDate = typeof defaultValue === 'string' ? this.parsePropDateString(defaultValue) : moment(defaultValue);
    const visibleDate = value ? date.clone() : initialDate; // must be copy, otherwise they get linked
    return {
      date: value ? date.clone() : undefined,
      visibleDate: visibleDate,
      mode: startMode
    };
  },

  getValue(_props) {
    return _props.valueLink ? _props.valueLink.value : _props.value;
  },

  getOnChange(_props) {
    return _props.valueLink ? _props.valueLink.requestChange : _props.onChange;
  },

  stopPropagation(e) {
    if (this.props.closeOnClickOutside) {
      e.stopPropagation();
    }
  },

  onChangeVisibleDate(date) {
    this.setState({visibleDate: date});
  },

  onChangeSelectedDate(date) {
    this.setState({
      visibleDate: date.clone(), // must be copy, otherwise they get linked
      date: date
    });
    this.getOnChange(this.props)(date.toDate());
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
      <div
        className={`react-datepicker ${floating} ${this.props.className}`}
        style={this.props.style}
        onClick={this.stopPropagation}>
        {picker}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (this.getValue(nextProps) !== this.getValue(this.props)) {
      this.setState(this.getStateFromProps(nextProps));
    }
  }

});

export default DatePicker;
