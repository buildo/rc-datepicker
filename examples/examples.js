import React from 'react';
import ReactDOM from 'react-dom';
import fakeImport from 'moment/locale/fr.js'; // eslint-disable-line no-unused-vars
import { DatePicker, DatePickerInput } from '../src';

import '../src/style.scss';

class Example extends React.Component {

  state = {
    datePickerDate: '2015-05-13',
    datePickerInputDate: null,
    datePickerInputDate2: null,
    showInput: true
  }

  toggleInput = () => this.setState({ showInput: !this.state.showInput })

  onClear = () => this.setState({ datePickerDate: null })

  log = (...x) => console.log(...x) // eslint-disable-line no-console

  resetState = () => this.setState({ datePickerInputDate2: undefined })

  render() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      <div style={{ margin: 20 }}>
        <h1>DatePickerInput</h1>
        <button onClick={this.toggleInput}>toggle DatePickerInput</button>
        <p>onChange(jsDate, dateString)</p>
        <p>dateString = "{this.state.datePickerInputDate}"</p>
        {this.state.showInput &&
          <div className='ui input'>
            <DatePickerInput
              displayFormat='DD/MM/YYYY'
              returnFormat='YYYY-MM-DD'
              className='my-react-component'
              onChange={(jsDate, dateString) => this.setState({ datePickerInputDate: dateString })}
              onShow={this.log.bind(this, 'show')}
              onHide={this.log.bind(this, 'hide')}
              showOnInputClick
              placeholder='placeholder'
              locale='de'
              onClear={this.onClear}
              iconClearClassName='fa fa-times'
              iconClassName='fa fa-calendar'
            />
          </div>
        }

        <h1>DatePicker (fixed calendar component)</h1>
        <p>onChange(jsDate)</p>
        <p>jsDate = {String(this.state.datePickerDate)}</p>
        <DatePicker
          className='my-react-datepicker'
          locale='fr'
          value={this.state.datePickerDate}
          onChange={(jsDate) => this.setState({ datePickerDate: jsDate })}
        />
        <p></p>
        <p>VALUE LINK</p>
        <button onClick={this.resetState}>reset state</button>
        <p>jsDate = {String(this.state.datePickerInputDate2)}</p>
        <div className='ui input'>
          <DatePickerInput
            displayFormat='DD/MM/YYYY'
            returnFormat='YYYY-MM-DD'
            className='my-react-component'
            defaultValue={yesterday}
            valueLink={{
              value: this.state.datePickerInputDate2,
              requestChange: datePickerInputDate2 => this.setState({ datePickerInputDate2 })
            }}
            showOnInputClick
            placeholder='placeholder'
            locale='de'
            iconClassName='calendar icon'
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Example />, document.getElementById('container'));
