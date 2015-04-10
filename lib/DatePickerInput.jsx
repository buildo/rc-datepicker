'use strict';

import React from 'react';
import moment from 'moment';
import DatePicker from './DatePicker.jsx';
import DateUtils from './utils/DateUtils.js';
import Locales from './utils/Locales.js';

const DatePickerInput = React.createClass({

  propTypes: {
    onChange:       React.PropTypes.func.isRequired,
    date:           DateUtils.evaluateDateProp,
    initialDate:    DateUtils.evaluateDateProp,
    minDate:        DateUtils.evaluateDateProp,
    maxDate:        DateUtils.evaluateDateProp,
    locale:         React.PropTypes.string,
    startMode:      React.PropTypes.string,
    fixedMode:      React.PropTypes.bool,
    placeholder:    React.PropTypes.string,
    format:         React.PropTypes.string,
    readOnly:       React.PropTypes.bool,
    autoClose:      React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      locale: 'en',
      autoClose: true,
      readOnly: false,
      startMode: 'day',
      fixedMode: false
    };
  },

  getInitialState() {
    this.temporaryHardcodedLocale();
    const _date = this.props.date || this.props.initialDate;
    const date = typeof _date === 'string' ? moment(_date, this.getFormat(), true) : moment(_date);
    return {
      date: _date ? date : undefined,
      dateString: _date ? date.format(this.getFormat()) : undefined,
      showing: false
    };
  },

  toggleDatePicker() {
    this.setState({showing: !this.state.showing});
  },

  _onChangeDate(jsDate) {
    const newDate = moment(jsDate);
    const newDateString = newDate.format(this.getFormat());
    console.log(newDateString);
    if (newDateString !== this.state.dateString) {
      this.setState({
        date: newDate,
        dateString: newDateString,
        showing: !this.props.autoClose
      });
    }
    this.props.onChange(jsDate, newDateString);
  },

  onChangeInput(dateString) {
    this.setState({ dateString });
    const parsedDate = moment(dateString, this.getFormat(dateString), true);
    if (parsedDate.isValid()) {
      this.setState({date: parsedDate});
    }
    const jsDate = parsedDate.isValid() ? parsedDate.toDate() : undefined;
    this.props.onChange(jsDate, dateString);
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
    // if (dateString) {
    //   const array = dateString.match(/\d+/g);
    //   if (Array.isArray(array) && array.length === 3 && array.filter((x) => x.length > 2).length === 0) {
    //     return this.props.locale === 'it' ? 'DD MM YY' : 'MM DD YY';
    //   }
    // }
    return 'L';
  },

  getDatePicker() {
    if (this.state.showing) {
      return (
        <DatePicker
          date={this.state.date ? this.state.date.toDate() : undefined}
          initialDate={this.props.initialDate}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          locale={this.props.locale}
          startMode={this.props.startMode}
          fixedMode={this.props.fixedMode}
          onChange={this._onChangeDate} />
        );
    }
  },

  render() {
    return (
      <div>
        <div className='ui action input datepicker-input'>
          <input
            type="text"
            placeholder={this.props.placeholder}
            valueLink={{value: this.state.dateString || '', requestChange: this.onChangeInput}}
            readOnly={this.props.readOnly} />
          <div className={'ui icon button' + (this.state.showing ? ' active' : '')} onClick={this.toggleDatePicker}>
            <i className='calendar icon'></i>
          </div>
        </div>
        {this.getDatePicker()}
      </div>
    );
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.date) {
      const _date = nextProps.date || nextProps.initialDate;
      const date = typeof _date === 'string' ? moment(_date, this.getFormat(), true) : moment(_date);
      this.setState({
        date: _date ? date : undefined,
        dateString: date.isValid() ? date.format(this.getFormat()) : this.state.dateString
      });
    }
  },

  temporaryHardcodedLocale() {
    moment.defineLocale('it', {
        months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
        monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
        weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
        weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
        weekdaysMin : 'D_L_Ma_Me_G_V_S'.split('_'),
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'LT:ss',
            L : 'DD/MM/YYYY',
            LL : 'D MMMM YYYY',
            LLL : 'D MMMM YYYY LT',
            LLLL : 'dddd, D MMMM YYYY LT'
        },
        calendar : {
            sameDay: '[Oggi alle] LT',
            nextDay: '[Domani alle] LT',
            nextWeek: 'dddd [alle] LT',
            lastDay: '[Ieri alle] LT',
            lastWeek: function () {
                switch (this.day()) {
                    case 0:
                        return '[la scorsa] dddd [alle] LT';
                    default:
                        return '[lo scorso] dddd [alle] LT';
                }
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : function (s) {
                return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
            },
            past : '%s fa',
            s : 'alcuni secondi',
            m : 'un minuto',
            mm : '%d minuti',
            h : 'un\'ora',
            hh : '%d ore',
            d : 'un giorno',
            dd : '%d giorni',
            M : 'un mese',
            MM : '%d mesi',
            y : 'un anno',
            yy : '%d anni'
        },
        ordinalParse : /\d{1,2}º/,
        ordinal: '%dº',
        week : {
            dow : 1, // Monday is the first day of the week.
            doy : 4  // The week that contains Jan 4th is the first week of the year.
        }
    });
  }
});

export default DatePickerInput;
