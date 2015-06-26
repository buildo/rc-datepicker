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
      <div className='ui action input' style={{margin: 20}}>
        <DatePickerInput onChange={() => {}} showOnInputClick />
      </div>
    );
  }

});

React.render(<Example />, document.getElementById('container'));