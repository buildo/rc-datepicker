import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import t from 'tcomb';
import { props } from 'tcomb-react';
import omit from 'lodash/omit';
import DatePicker from './DatePicker';
import { Value } from './utils/model';
import { format, valueLink, skinnable } from './utils';
import cx from 'classnames';
import Input from './Input';

const INVALID = 'Invalid date';
const ENTER_KEYCODE = 13;

const propTypes = {
  onChange: t.maybe(t.Function),
  onShow: t.maybe(t.Function),
  onHide: t.maybe(t.Function),
  value: t.maybe(Value),
  valueLink: t.maybe(t.interface({
    value: t.maybe(Value),
    requestChange: t.Function
  })),
  small: t.maybe(t.Boolean),
  defaultValue: t.maybe(Value),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  locale: t.maybe(t.String),
  startMode: t.maybe(t.String),
  fixedMode: t.maybe(t.Boolean),
  displayFormat: t.maybe(t.String),
  returnFormat: t.maybe(t.String),
  format: t.maybe(t.String),
  validationFormat: t.maybe(t.String),
  showOnInputClick: t.maybe(t.Boolean),
  closeOnClickOutside: t.maybe(t.Boolean),
  showInputButton: t.maybe(t.Boolean),
  autoClose: t.maybe(t.Boolean),
  floating: t.maybe(t.Boolean),
  iconClassName: t.maybe(t.String),
  iconClearClassName: t.maybe(t.String),
  onClear: t.maybe(t.Function),
  className: t.maybe(t.String), // used to omit from inputProps
  style: t.maybe(t.Object) // used to omit from inputProps
};

@format
@valueLink
@skinnable()
@props(propTypes, { strict: false })
export default class DatePickerInput extends React.Component {

  static defaultProps = {
    onShow: () => {},
    onHide: () => {},
    startMode: 'day',
    autoClose: true,
    closeOnClickOutside: true,
    floating: true,
    small: false,
    showInputButton: true,
    iconClassName: '',
    iconClearClassName: '',
    className: '',
    style: {}
  }

  constructor(props) {
    super(props);
    const _date = this.getValueLink().value || props.defaultValue;
    const date = typeof _date === 'string' ? this.parsePropDateString(_date) : moment(_date);
    this.state = {
      date: _date ? date : undefined,
      hasValue: !!_date,
      dateString: _date ? this.formatDisplayedDate(date) : '',
      showing: false
    };
  }

  componentDidMount() {
    if (this.props.closeOnClickOutside) {
      this.addOnClickListener();
    }
  }

  addOnClickListener = () => {
    if (window.attachEvent) {
      //Internet Explorer
      window.attachEvent('onclick', this.hideOnClickOutside);
    } else if (window.addEventListener) {
      window.addEventListener('click', this.hideOnClickOutside, false);
    }
  }

  removeOnClickListener = () => {
    if (window.detachEvent) {
      //Internet Explorer
      window.detachEvent('onclick', this.hideOnClickOutside);
    } else if (window.removeEventListener) {
      window.removeEventListener('click', this.hideOnClickOutside, false);
    }
  }

  getDatePickerInput = () => {
    return ReactDOM.findDOMNode(this.refs.datePickerInput);
  }

  isEventInsideDatePickerInput = (el) => {
    if (el === this.getDatePickerInput()) {
      return true;
    } else if (el.parentNode) {
      return this.isEventInsideDatePickerInput(el.parentNode);
    } else {
      return false;
    }
  }

  hideOnClickOutside = (e) => {
    if (!this.isEventInsideDatePickerInput(e.target) && this.state.showing) {
      this.hide();
    }
  }

  hide = () => {
    this.setState({ showing: false }, this.props.onHide);
  }

  show = () => {
    if (!this.state.showing) {
      this.setState({ showing: true }, this.props.onShow);
    }
  }

  toggleDatePicker = () => {
    const callback = this.state.showing ? this.props.onHide : this.props.onShow;
    this.setState({ showing: !this.state.showing }, callback);
  }

  hideOnEnterKey = (e) => {
    if (e.keyCode === ENTER_KEYCODE) {
      this.hide();
    }
  }

  onClear = () => {
    const _date = this.props.defaultValue;
    const date = typeof _date === 'string' ? this.parsePropDateString(_date) : moment(_date);
    this.setState(
      {
        date: _date ? date : undefined,
        dateString: _date ? this.formatDisplayedDate(date) : '',
        showing: false
      },
      this.props.onClear
    );
  }

  _onChangeDate = (jsDate) => {
    const newDate = moment(jsDate);
    const newDateString = this.formatDisplayedDate(newDate);
    if (this.props.autoClose) {
      this.hide();
    }
    this.getValueLink().requestChange(jsDate, this.formatReturnedDate(newDate));
    if (newDateString !== this.state.dateString) {
      this.setState({
        hasValue: true,
        date: newDate,
        dateString: newDateString
      });
    }
  }

  onChangeInput = ({ target: { value: dateString } }) => {
    if (dateString || this.state.date) {
      const parsedDate = this.parseInputDateString(dateString);
      const date = parsedDate.isValid() ? parsedDate : this.state.date;

      const jsDate = parsedDate.isValid() ? parsedDate.toDate() : INVALID;
      const returnedDateString = jsDate ? this.formatReturnedDate(parsedDate) : INVALID;

      this.setState({
        dateString,
        date,
        hasValue: parsedDate.isValid()
      }, () => this.getValueLink().requestChange(jsDate, returnedDateString));
    } else if (!dateString) {
      this.setState({ dateString });
    }
  }

  getLocals(props) {
    const {
      showInputButton,
      iconClassName,
      showOnInputClick,
      onClear,
      small,
      iconClearClassName,
      defaultValue,
      minDate, maxDate,
      locale,
      startMode,
      fixedMode,
      floating,
      closeOnClickOutside,
      className,
      style
    } = props;
    const { showing: active, hasValue, dateString: value, date } = this.state;

    const inputProps = omit(props, Object.keys(propTypes));
    const onInputClick = showOnInputClick ? this.show : undefined;
    const onButtonClick = showInputButton ? this.toggleDatePicker : undefined;

    return {
      style,
      className: cx('react-datepicker-component', className),
      inputProps: {
        value,
        small, active, hasValue,
        iconClassName, iconClearClassName,
        onInputClick, onButtonClick,
        onInputChange: this.onChangeInput,
        onInputKeyUp: this.hideOnEnterKey,
        onInputClear: onClear,
        ...inputProps
      },
      datePickerProps: active && {
        defaultValue,
        minDate,
        maxDate,
        locale,
        startMode,
        fixedMode,
        floating,
        closeOnClickOutside,
        value: date ? date.toDate() : undefined,
        onChange: this._onChangeDate
      }
    };
  }

  template({ className, style, inputProps, datePickerProps }) {
    return (
      <div {...{ style, className }} ref='datePickerInput'>
        <Input {...inputProps} />
        {datePickerProps && <DatePicker {...datePickerProps} />}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.getValueLink(nextProps);
    if (value !== INVALID && value !== this.getValueLink().value) {
      if (value) {
        const date = typeof value === 'string' ?
          this.parsePropDateString(value, nextProps) : moment(value);
        this.setState({
          date,
          dateString: date.isValid() ?
            this.formatDisplayedDate(date, nextProps) : this.state.dateString
        });
      } else {
        this.setState({
          date: undefined,
          dateString: ''
        });
      }
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnClickOutside) {
      this.removeOnClickListener();
    }
  }
}
