import React from 'react';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { skinnable } from './utils';

@skinnable()
@props({
  invalidDate: t.maybe(t.String)
})
export default class InvalidDate extends React.PureComponent {
  template({ invalidDate }) {
    return (
      <div className='react-datepicker-body'>
        <h3 className='invalid-date'>
          {invalidDate}
        </h3>
      </div>
    );
  }
}
