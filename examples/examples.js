import React from 'react';
import fakeImport from 'moment/locale/fr.js';
import {DatePicker, DatePickerInput} from '../src';

const Example = React.createClass({

  propTypes: {},

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div style={{margin: 20}}>
        <div className='ui input'>
          <DatePickerInput onChange={() => {}} showOnInputClick />
        </div>
        <p>The datepicker should render over me</p>
      </div>
    );
  }

});

React.render(<Example />, document.getElementById('container'));