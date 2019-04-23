import React from 'react';
import moment from 'moment';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { format, valueLink, skinnable } from './utils';
import { Value, Mode } from './utils/model';
import DayPicker from './daypicker/DayPicker';
import MonthPicker from './monthpicker/MonthPicker';
import YearPicker from './yearpicker/YearPicker';
import cx from 'classnames';

@valueLink
@format
@skinnable()
@props({
  onChange: t.maybe(t.Function),
  value: t.maybe(Value),
  valueLink: t.maybe(t.interface({
    value: t.maybe(Value),
    requestChange: t.Function
  })),
  defaultValue: t.maybe(Value),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  locale: t.maybe(t.String),
  startMode: t.maybe(Mode),
  startDate: t.maybe(Value),
  fixedMode: t.maybe(t.Boolean),
  returnFormat: t.maybe(t.String),
  floating: t.maybe(t.Boolean),
  closeOnClickOutside: t.maybe(t.Boolean), // used only with DatePickerInput
  className: t.maybe(t.String),
  prevIconClassName: t.maybe(t.String),
  nextIconClassName: t.maybe(t.String),
  position: t.maybe(t.enums.of(['top', 'bottom'])),
  style: t.maybe(t.Object),
  placeholder: t.maybe(t.String)
})
export default class DatePicker extends React.Component {

  static defaultProps = {
    startMode: 'day',
    className: '',
    prevIconClassName: 'icon-rc-datepicker icon-rc-datepicker_prev',
    nextIconClassName: 'icon-rc-datepicker icon-rc-datepicker_next',
    style: {},
    position: 'bottom'
  }

  constructor(props) {
    super(props);
    if (props.locale) {
      moment.locale(props.locale);
      if (process.env.NODE_ENV !== 'production' && moment.locale() !== props.locale) {
        console.warn(`Setting "${props.locale}" as locale failed. Did you import it correctly?`); // eslint-disable-line no-console
      }
    }
    this.state = this.getStateFromProps(props);
  }

  getStateFromProps = (_props) => {
    const { value } = this.getValueLink(_props);
    const { defaultValue, startDate, startMode } = _props;
    const date = typeof value === 'string' ? this.parsePropDateString(value) : moment(value);
    const initialDate = defaultValue ?
      typeof defaultValue === 'string' ? this.parsePropDateString(defaultValue) : moment(defaultValue) :
      typeof startDate === 'string' ? this.parsePropDateString(startDate) : moment(startDate);

    const visibleDate = value ? date.clone() : initialDate; // must be copy, otherwise they get linked
    return {
      date: value ? date.clone() : undefined,
      visibleDate,
      mode: startMode
    };
  }

  onChangeVisibleDate = (date) => {
    this.setState({ visibleDate: date });
  }

  onChangeSelectedDate = (date) => {
    this.setState({
      visibleDate: date.clone(), // must be copy, otherwise they get linked
      date
    }, () => this.getValueLink().requestChange(date.toDate()));
  }

  onChangeMode = (mode) => {
    setTimeout(() => this.setState({ mode }));
  }

  changeYear = (year) => {
    this.setState({ visibleDate: this.state.visibleDate.clone().year(year) });
  }

  changeMonth = (month) => {
    this.setState({ visibleDate: this.state.visibleDate.clone().month(month) });
  }

  getLocals({ className, style, floating, minDate, maxDate, fixedMode, prevIconClassName, nextIconClassName, position }) {
    const { mode, date, visibleDate } = this.state;
    return {
      style,
      className: cx('react-datepicker', className, { floating, 'position-top': position === 'top' }),
      dayPickerProps: mode === Mode('day') && {
        date, visibleDate,
        minDate, maxDate,
        mode,
        fixedMode,
        prevIconClassName,
        nextIconClassName,
        changeMonth: this.changeMonth,
        onSelectDate: this.onChangeSelectedDate,
        onChangeMode: this.onChangeMode
      },
      monthPickerProps: mode === Mode('month') && {
        date, visibleDate,
        minDate, maxDate,
        mode,
        fixedMode,
        prevIconClassName,
        nextIconClassName,
        changeYear: this.changeYear,
        onSelectDate: this.onChangeSelectedDate,
        onChangeMode: this.onChangeMode,
        onChangeVisibleDate: this.onChangeVisibleDate
      },
      yearPickerProps: mode === Mode('year') && {
        date, visibleDate,
        minDate, maxDate,
        mode,
        fixedMode,
        prevIconClassName,
        nextIconClassName,
        changeYear: this.changeYear,
        onSelectDate: this.onChangeSelectedDate,
        onChangeMode: this.onChangeMode,
        onChangeVisibleDate: this.onChangeVisibleDate
      }
    };
  }

  template({ className, style, dayPickerProps, monthPickerProps, yearPickerProps }) {
    return (
      <div {...{ className, style }}>
        {dayPickerProps && <DayPicker {...dayPickerProps} />}
        {monthPickerProps && <MonthPicker {...monthPickerProps} />}
        {yearPickerProps && <YearPicker {...yearPickerProps} />}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.getValueLink(nextProps).value !== this.getValueLink().value) {
      this.setState(this.getStateFromProps(nextProps));
    }
  }
}
