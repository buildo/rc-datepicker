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

export const Props = {
  value: t.maybe(Value),
  valueLink: t.maybe(t.interface({
    value: t.maybe(Value),
    requestChange: t.Function
  })),
  onChange: t.maybe(t.Function),
  onShow: t.maybe(t.Function),
  onHide: t.maybe(t.Function),
  onClear: t.maybe(t.Function),
  small: t.maybe(t.Boolean),
  defaultValue: t.maybe(Value),
  minDate: t.maybe(Value),
  maxDate: t.maybe(Value),
  locale: t.maybe(t.String),
  startMode: t.maybe(t.enums.of(['day', 'month', 'year'])),
  startDate: t.maybe(Value),
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
  disabled: t.maybe(t.Boolean),
  position: t.maybe(t.enums.of(['top', 'bottom'])),
  iconClassName: t.maybe(t.String),
  iconClearClassName: t.maybe(t.String),
  className: t.maybe(t.String), // used to omit from inputProps
  style: t.maybe(t.Object), // used to omit from inputProps
  placeholder: t.maybe(t.String)
};

/** A decent and pretty date picker to be used with React
 * @param value - current date
 * @param valueLink - valueLink object to replace "value" and "onChange"
 * @param onChange - called when value changes
 * @param onShow - called when datepicker is opened
 * @param onHide - called when datepicker is closed
 * @param onClear - called when value is cleared
 * @param small - whether it's small or not
 * @param defaultValue - default date
 * @param minDate - minimum date selectable by the user
 * @param maxDate - maximum date selectable by the user
 * @param locale - locale used for translations
 * @param startMode - the start view of the datepicker
 * @param startDate - specify an initial "visible" date with no need to select a defaultValue
 * @param fixedMode - whether the user can use multiple views or not
 * @param displayFormat - MomentJS format used to display current date
 * @param returnFormat - MomentJS format used to format date before returing through "onChange"
 * @param format - MomentJS format used to format date before returing through "onChange"
 * @param validationFormat - MomentJS format used to format date before returing through "onChange"
 * @param showOnInputClick - whether the datepicker should open when user click on the input
 * @param closeOnClickOutside - whether the datepicker should close when user clicks outside of it
 * @param showInputButton - whether the input-button should be rendered
 * @param autoClose - pass true if you want the datepicker to close automatically after the user selects a value
 * @param floating - whether the datepicker should float over the page content (absolute position)
 * @param position - whether the datepicker should be rendered above or below the input field
 * @param disabled - whether the datepicker should be disabled or not
 * @param iconClassName - classname used for the icon
 * @param iconClearClassName - classname used for the clear icon
 * @param className - className used for the wrapper div
 * @param style - style used for the wrapper div
 * @param placeholder
 */


@format
@valueLink
@skinnable()
@props(Props, { strict: false })
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
    position: 'bottom',
    iconClassName: 'icon-rc-datepicker icon-rc-datepicker_calendar',
    iconClearClassName: 'icon-rc-datepicker icon-rc-datepicker_clear',
    className: '',
    style: {}
  }

  datePickerInputRef = null;

  constructor(props) {
    super(props);
    if (props.locale) {
      moment.locale(props.locale);
    }
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
      // Internet Explorer
      window.attachEvent('onclick', this.hideOnClickOutside);
    } else if (window.addEventListener) {
      window.addEventListener('click', this.hideOnClickOutside, false);
    }
  }

  removeOnClickListener = () => {
    if (window.detachEvent) {
      // Internet Explorer
      window.detachEvent('onclick', this.hideOnClickOutside);
    } else if (window.removeEventListener) {
      window.removeEventListener('click', this.hideOnClickOutside, false);
    }
  }

  getDatePickerInput = () => {
    return ReactDOM.findDOMNode(this.datePickerInputRef);
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
      startDate,
      fixedMode,
      floating,
      closeOnClickOutside,
      className,
      disabled,
      position,
      placeholder,
      style
    } = props;
    const { showing: active, hasValue, dateString: value, date } = this.state;

    const inputProps = omit(props, Object.keys(Props));
    const onInputClick = showOnInputClick ? this.show : undefined;
    const onButtonClick = showInputButton ? this.toggleDatePicker : undefined;
    const onInputClear = onClear ? this.onClear : undefined;

    return {
      style,
      className: cx('react-datepicker-component', { 'is-disabled': disabled }, className),
      inputProps: {
        value,
        small, active, hasValue,
        iconClassName, iconClearClassName,
        onInputClick, onButtonClick, onInputClear,
        onInputChange: this.onChangeInput,
        onInputKeyUp: this.hideOnEnterKey,
        placeholder,
        ...inputProps
      },
      datePickerProps: active && {
        defaultValue,
        minDate,
        maxDate,
        locale,
        startMode,
        startDate,
        fixedMode,
        floating,
        position,
        closeOnClickOutside,
        value: date ? date.toDate() : undefined,
        onChange: this._onChangeDate
      }
    };
  }

  template({ className, style, inputProps, datePickerProps }) {
    return (
      <div {...{ style, className }} ref={input => { this.datePickerInputRef = input; }}>
        <Input {...inputProps} />
        {datePickerProps && <DatePicker {...datePickerProps} />}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.getValueLink(nextProps);

    // Update `date` and `dateString` if `props.value` has changed
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

    // Close datepicker if `disabled` has switched to `true`
    if (nextProps.disabled && !this.props.disabled) {
      this.hide();
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnClickOutside) {
      this.removeOnClickListener();
    }
  }
}
