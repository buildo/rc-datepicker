import React, { PropTypes } from 'react';
import moment from 'moment';
import omit from 'lodash/object/omit';
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
  className: PropTypes.string, // used to omit from inputProps
  style: PropTypes.object // used to omit from inputProps
};

const DatePickerInput = React.createClass({

  propTypes: propTypes,

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
      window.attachEvent('onclick', this.hide);
    } else if(window.addEventListener) {
      window.addEventListener('click', this.hide, false);
    }
  },

  removeOnClickListener() {
    if (window.detachEvent) {
      //Internet Explorer
      window.detachEvent('onclick', this.hide);
    } else if(window.removeEventListener) {
      window.removeEventListener('click', this.hide, false);
    }
  },

  stopPropagation(e) {
    if (this.props.closeOnClickOutside) {
      e.stopPropagation();
    }
  },

  hide() {
    if (this.state.showing) {
      this.setState({showing: false}, this.props.onHide);
    }
  },

  show() {
    if (!this.state.showing) {
      this.setState({showing: true}, this.props.onShow);
    }
  },

  toggleDatePicker() {
    const callback = this.state.showing ? this.props.onHide : this.props.onShow;
    this.setState({showing: !this.state.showing}, callback);
  },

  hideOnEnterKey(event) {
    if (event.keyCode === ENTER_KEYCODE) {
      this.hide();
    }
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
    const parsedDate = moment(dateString, this.getFormat(dateString), true);
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
    let inputButton = null;
    if (this.props.showInputButton) {
      inputButton = (
        <div className={cx('input-button', {active: this.state.showing})} onClick={this.toggleDatePicker}>
          <i className={this.props.iconClassName} />
        </div>
      );
    }

    const onInputClick = this.props.showOnInputClick ? this.show : undefined;
    return (
      <div
        className={cx('react-datepicker-component', this.props.className)}
        style={this.props.style}
        onClick={this.stopPropagation}>
        <div className='react-datepicker-input'>
          <input
            valueLink={{value: this.state.dateString, requestChange: this.onChangeInput}}
            onClick={onInputClick}
            onKeyUp={this.hideOnEnterKey}
            {...inputProps}
          />
          {inputButton}
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
          date: date,
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
