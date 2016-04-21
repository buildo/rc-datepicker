import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import omit from 'lodash/omit';
import DatePicker from './DatePicker';
import DateUtils from './utils/DateUtils';
import formatMixin from './utils/formatMixin';
import cx from 'classnames';
import ValueLinkMixin from './utils/ValueLinkMixin.js';

const INVALID = 'Invalid date';
const ENTER_KEYCODE = 13;

const propTypes = {
  onChange: PropTypes.func,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  value: DateUtils.evaluateDateProp,
  valueLink: PropTypes.shape({
    value: DateUtils.evaluateDateProp,
    requestChange: PropTypes.func.isRequired
  }),
  defaultValue: DateUtils.evaluateDateProp,
  minDate: DateUtils.evaluateDateProp,
  maxDate: DateUtils.evaluateDateProp,
  locale: PropTypes.string,
  startMode: PropTypes.string,
  fixedMode: PropTypes.bool,
  displayFormat: PropTypes.string,
  returnFormat: PropTypes.string,
  format: PropTypes.string,
  validationFormat: PropTypes.string,
  showOnInputClick: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
  showInputButton: PropTypes.bool,
  autoClose: PropTypes.bool,
  floating: PropTypes.bool,
  iconClassName: PropTypes.string,
  iconClearClassName: PropTypes.string,
  onClear: PropTypes.func,
  className: PropTypes.string, // used to omit from inputProps
  style: PropTypes.object // used to omit from inputProps
};

const DatePickerInput = React.createClass({

  propTypes,

  mixins: [ ValueLinkMixin, formatMixin ],

  getDefaultProps() {
    return {
      onShow: () => {},
      onHide: () => {},
      startMode: 'day',
      autoClose: true,
      closeOnClickOutside: true,
      floating: true,
      showInputButton: true,
      iconClassName: '',
      className: '',
      style: {}
    };
  },

  getInitialState() {
    const _date = this.getValueLink().value || this.props.defaultValue;
    const date = typeof _date === 'string' ? this.parsePropDateString(_date) : moment(_date);
    return {
      date: _date ? date : undefined,
      dateString: _date ? this.formatDisplayedDate(date) : '',
      showing: false
    };
  },

  componentDidMount() {
    if (this.props.closeOnClickOutside) {
      this.addOnClickListener();
    }
  },

  addOnClickListener() {
    if (window.attachEvent) {
      //Internet Explorer
      window.attachEvent('onclick', this.hideOnClickOutside);
    } else if (window.addEventListener) {
      window.addEventListener('click', this.hideOnClickOutside, false);
    }
  },

  removeOnClickListener() {
    if (window.detachEvent) {
      //Internet Explorer
      window.detachEvent('onclick', this.hideOnClickOutside);
    } else if (window.removeEventListener) {
      window.removeEventListener('click', this.hideOnClickOutside, false);
    }
  },

  getDatePickerInput() {
    return ReactDOM.findDOMNode(this.refs.datePickerInput);
  },

  isEventInsideDatePickerInput(el) {
    if (el === this.getDatePickerInput()) {
      return true;
    } else if (el.parentNode) {
      return this.isEventInsideDatePickerInput(el.parentNode);
    } else {
      return false;
    }
  },

  hideOnClickOutside(e) {
    if (!this.isEventInsideDatePickerInput(e.target) && this.state.showing) {
      this.hide();
    }
  },

  hide() {
    this.setState({ showing: false }, this.props.onHide);
  },

  show() {
    if (!this.state.showing) {
      this.setState({ showing: true }, this.props.onShow);
    }
  },

  toggleDatePicker() {
    const callback = this.state.showing ? this.props.onHide : this.props.onShow;
    this.setState({ showing: !this.state.showing }, callback);
  },

  hideOnEnterKey(event) {
    if (event.keyCode === ENTER_KEYCODE) {
      this.hide();
    }
  },

  onClear() {
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
  },

  _onChangeDate(jsDate) {
    const newDate = moment(jsDate);
    const newDateString = this.formatDisplayedDate(newDate);
    if (this.props.autoClose) {
      this.hide();
    }
    this.getValueLink().requestChange(jsDate, this.formatReturnedDate(newDate));
    if (newDateString !== this.state.dateString) {
      this.setState({
        date: newDate,
        dateString: newDateString
      });
    }
  },


  onChangeInput(dateString) {
    const parsedDate = this.parseInputDateString(dateString);
    const date = parsedDate.isValid() ? parsedDate : this.state.date;

    const jsDate = parsedDate.isValid() ? parsedDate.toDate() : INVALID;
    const returnedDateString = jsDate ? this.formatReturnedDate(parsedDate) : INVALID;

    this.setState(
      { dateString, date },
      () => this.getValueLink().requestChange(jsDate, returnedDateString)
    );
  },

  getDatePicker() {
    if (this.state.showing) {
      return (
        <DatePicker
          value={this.state.date ? this.state.date.toDate() : undefined}
          onChange={this._onChangeDate}
          defaultValue={this.props.defaultValue}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          locale={this.props.locale}
          startMode={this.props.startMode}
          fixedMode={this.props.fixedMode}
          floating={this.props.floating}
          closeOnClickOutside={this.props.closeOnClickOutside}
        />
      );
    }
  },

  render() {
    const inputProps = omit(this.props, Object.keys(propTypes));
    const {
      showInputButton,
      showing: active,
      iconClassName,
      showOnInputClick,
      onClear,
      iconClearClassName,
      className,
      style
    } = this.props;

    const inputButton = (
      <div className={cx('input-button', { active })} onClick={this.toggleDatePicker}>
        <i className={iconClassName} />
      </div>
    );

    const clearButton = (
      <div className='clear-button' onClick={this.onClear}>
        <i className={iconClearClassName} />
      </div>
    );

    const onInputClick = showOnInputClick ? this.show : undefined;
    return (
      <div
        className={cx('react-datepicker-component', className)}
        style={style}
        ref='datePickerInput'
      >
        <div className='react-datepicker-input'>
          <input
            valueLink={{ value: this.state.dateString, requestChange: this.onChangeInput }}
            onClick={onInputClick}
            onKeyUp={this.hideOnEnterKey}
            {...inputProps}
          />
          <div className='button-wrapper'>
            {onClear && clearButton}
            {showInputButton && inputButton}
          </div>
        </div>
        {this.getDatePicker()}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    const { value } = this.getValueLink(nextProps);
    if (value !== INVALID && value !== this.getValueLink().value) {
      if (value) {
        const date = typeof value === 'string' ? this.parsePropDateString(value, nextProps) : moment(value);
        this.setState({
          date,
          dateString: date.isValid() ? this.formatDisplayedDate(date, nextProps) : this.state.dateString
        });
      } else {
        this.setState({
          date: undefined,
          dateString: ''
        });
      }
    }
  },

  componentWillUnmount() {
    if (this.props.closeOnClickOutside) {
      this.removeOnClickListener();
    }
  }

});

export default DatePickerInput;
