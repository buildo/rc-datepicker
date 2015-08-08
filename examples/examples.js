import React from 'react/addons';
import fakeImport from 'moment/locale/fr.js';
import {DatePicker, DatePickerInput} from '../src';

const Example = React.createClass({

  propTypes: {},

  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      datePickerDate: null,
      datePickerInputDate: null,
      datePickerInputDate2: null,
      showInput: true
    };
  },

  toggleInput() {
    this.setState({
      showInput: !this.state.showInput
    });
  },

  log(x) {
    console.log(x);
  },

  onChange2(a, b) {
    this.setState({datePickerInputDate2: a});
  },

  render() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      <div style={{margin: 20}}>

        <h1>DatePickerInput</h1>
        <button onClick={this.toggleInput}>toggle DatePickerInput</button>
        <p>onChange(jsDate, dateString)</p>
        <p>dateString = "{this.state.datePickerInputDate}"</p>
        {this.state.showInput &&
          <div className='ui input'>
            <DatePickerInput
              className='my-react-component'
              onChange={(jsDate, dateString) => this.setState({datePickerInputDate: dateString})}
              onShow={this.log.bind(this, 'show')}
              onHide={this.log.bind(this, 'hide')}
              showOnInputClick
              placeholder='placeholder'
              locale='de'
              iconClassName='calendar icon'/>
          </div>
        }

        <h1>DatePicker (fixed calendar component)</h1>
        <p>onChange(jsDate)</p>
        <p>jsDate = {String(this.state.datePickerDate)}</p>
        <DatePicker
          className='my-react-datepicker'
          locale='fr'
          onChange={(jsDate) => this.setState({datePickerDate: jsDate})}/>

        <p></p>
        <p>VALUE LINK</p>
        <p>jsDate = {String(this.state.datePickerInputDate2)}</p>
        <div className='ui input'>
          <DatePickerInput
            className='my-react-component'
            defaultValue={yesterday}
            valueLink={{value: this.state.datePickerInputDate2, requestChange: this.onChange2}}
            showOnInputClick
            placeholder='placeholder'
            locale='de'
            iconClassName='calendar icon'/>
        </div>
      </div>
    );
  }

});

React.render(<Example />, document.getElementById('container'));