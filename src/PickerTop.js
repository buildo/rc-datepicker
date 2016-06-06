import React from 'react';
import cx from 'classnames';
import t from 'tcomb';
import { props } from 'tcomb-react';
import { pure, skinnable } from './utils';

@pure
@skinnable()
@props({
  fixed: t.maybe(t.Boolean),
  handleClick: t.maybe(t.Function),
  nextDate: t.maybe(t.Function),
  previousDate: t.maybe(t.Function),
  value: t.union([t.String, t.Number]),
  weekDays: t.maybe(t.ReactChildren)
})
export default class PickerTop extends React.Component {
  template({ value, fixed, previousDate, nextDate, handleClick, weekDays }) {
    return (
      <div className='react-datepicker-top'>
        <div className='display'>
          <div className='react-datepicker-button button-left'
            onClick={previousDate}
          >
            &lt;
          </div>
          <div className={cx('react-datepicker-button button-label', { fixed })}
            onClick={handleClick}
          >
            <strong>{value}</strong>
          </div>
          <div className='react-datepicker-button button-right'
            onClick={nextDate}
          >
            &gt;
          </div>
        </div>
        {weekDays}
      </div>
    );
  }
}
