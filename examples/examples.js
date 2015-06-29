import React from 'react';
import fakeImport from 'moment/locale/fr.js';
import {DatePicker, DatePickerInput} from '../src';

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {
      datePickerDate: null,
      datePickerInputDate: null
    };
  },

  render() {
    return (
      <div style={{margin: 20}}>

        <h1>DatePickerInput</h1>
        <p>onChange(jsDate, dateString)</p>
        <p>dateString = "{this.state.datePickerInputDate}"</p>
        <div className='ui input'>
          <DatePickerInput
            className='my-react-component'
            onChange={(jsDate, dateString) => this.setState({datePickerInputDate: dateString})}
            showOnInputClick
            placeholder='placeholder'
            iconClassName='calendar icon'/>
        </div>

        <h1>DatePicker (fixed calendar component)</h1>
        <p>onChange(jsDate)</p>
        <p>jsDate = {String(this.state.datePickerDate)}</p>
        <DatePicker
          className='my-react-datepicker'
          onChange={(jsDate) => this.setState({datePickerDate: jsDate})}/>
      </div>
    );
  }

});

React.render(<Example />, document.getElementById('container'));