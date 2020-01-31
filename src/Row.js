import React from 'react';
import cx from 'classnames';
import t from 'tcomb';
import { props, ReactChildren } from 'tcomb-react';
import View from 'react-flexview';
import { skinnable } from './utils';
import { Mode } from './utils/model';

@skinnable()
@props({
  pickers: t.list(ReactChildren),
  mode: Mode
})
export default class Row extends React.PureComponent {

  getLocals({ mode, pickers }) {
    return {
      pickers,
      className: cx('react-datepicker-row', mode)
    };
  }

  template({ className, pickers }) {
    return (
      <View className={className} width='100%' basis='100%' shrink>
        {pickers}
      </View>
    );
  }

}
