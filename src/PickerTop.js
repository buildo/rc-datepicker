import React from 'react';
import cx from 'classnames';
import t from 'tcomb';
import { props } from 'tcomb-react';
import View from 'react-flexview';
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
      <View column className='react-datepicker-top'>
        <View shrink={false} className='display'>
          <View
            className='react-datepicker-button button-left'
            onClick={previousDate}
            vAlignContent='center' shrink={false}
          >
            &lt;
          </View>
          <View
            className={cx('react-datepicker-button button-label', { fixed })}
            onClick={handleClick}
            hAlignContent='center' vAlignContent='center' grow
          >
            <strong>{value}</strong>
          </View>
          <View
            className='react-datepicker-button button-right'
            onClick={nextDate}
            vAlignContent='center' shrink={false}
          >
            &gt;
          </View>
        </View>
        {weekDays}
      </View>
    );
  }
}
