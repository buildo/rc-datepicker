import React, {PropTypes} from 'react';
import moment from 'moment';
import omit from 'lodash/object/omit';
import DatePicker from './DatePicker';
import DateUtils from './utils/DateUtils.js';

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
  format: PropTypes.string,
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
    const _date = this.getValue(this.props) || this.props.defaultValue;
    const date = typeof _date === 'string' ? moment(_date, this.getFormat(), true) : moment(_date);
    return {
      date: _date ? date : undefined,
      dateString: _date ? date.format(this.getFormat()) : '',
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

  onShowingChange() {
    if (this.state.showing) {
      this.props.onShow();
    } else {
      this.props.onHide();
    }
  },

  hide() {
    if (this.state.showing) {
      this.setState({showing: false}, this.onShowingChange);
    }
  },

  show() {
    if (!this.state.showing) {
      this.setState({showing: true}, this.onShowingChange);
    }
  },

  toggleDatePicker() {
    if (this.state.showing) {
      this.hide();
    } else {
      this.show();
    }
  },

  hideOnEnterKey(event) {
    if (event.keyCode === ENTER_KEYCODE) {
      this.hide();
    }
  },

  _onChangeDate(jsDate) {
    const newDate = moment(jsDate);
    const newDateString = newDate.format(this.getFormat());
    if (newDateString !== this.state.dateString) {
      this.setState({
        date: newDate,
        dateString: newDateString
      });
    }
    if (this.props.autoClose) {
      this.hide();
    }
    this.getOnChange(this.props)(jsDate, newDateString);
  },

  onChangeInput(dateString) {
    this.setState({ dateString });
    const parsedDate = moment(dateString, this.getFormat(dateString), true);
    if (parsedDate.isValid()) {
      this.setState({date: parsedDate});
    }
    const jsDate = parsedDate.isValid() ? parsedDate.toDate() : undefined;
    this.getOnChange(this.props)(jsDate, dateString);
  },

  getFormat() {
    if (this.props.format) {
      return this.props.format;
    }
    if (this.props.fixed) {
      switch (this.props.startMode) {
        case 'month':
          return 'MMMM';
        case 'year':
          return 'YYYY';
      }
    }

    return 'L';
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
    const active = this.state.showing ? 'active' : '';
    const inputProps = omit(this.props, Object.keys(propTypes));

    const getInputButton = () => {
      if (this.props.showInputButton) {
        return (
          <div className={`input-button ${active}`} onClick={this.toggleDatePicker}>
            <i className={this.props.iconClassName} />
          </div>
        );
      }
    };

    const onInputClick = this.props.showOnInputClick ? this.show : undefined;
    return (
      <div
        className={`react-datepicker-component ${this.props.className}`}
        style={this.props.style}
        onClick={this.stopPropagation}>
        <div className='react-datepicker-input'>
          <input
            valueLink={{value: this.state.dateString, requestChange: this.onChangeInput}}
            onClick={onInputClick}
            onKeyUp={this.hideOnEnterKey}
            {...inputProps}
          />
          {getInputButton()}
        </div>
        {this.getDatePicker()}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    const value = this.getValue(nextProps);
    if (value !== this.getValue(this.props)) {
      if (value) {
        const date = typeof value === 'string' ? moment(value, this.getFormat(), true) : moment(value);
        this.setState({
          date: date,
          dateString: date.isValid() ? date.format(this.getFormat()) : this.state.dateString
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
