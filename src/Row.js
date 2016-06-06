import React from 'react';
import cx from 'classnames';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { pure, skinnable } from './utils';
import { Mode } from './utils/model';

@pure
@skinnable()
@props({
  pickers: t.list(t.ReactChildren),
  mode: Mode
})
export default class Row extends React.Component {

  getLocals({ mode, pickers }) {
    return {
      pickers,
      className: cx('react-datepicker-row', mode)
    };
  }

  template({ className, pickers }) {
    return (
      <div className={className}>
        {pickers}
      </div>
    );
  }

}
