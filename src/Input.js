import React from 'react';
import cx from 'classnames';
import { props } from 'tcomb-react';
import t from 'tcomb';
import View from 'react-flexview';
import skinnable from './utils/skinnable';
import pure from './utils/pure';

@pure
@skinnable()
@props({
  value: t.maybe(t.String),
  onInputChange: t.Function,
  iconClearClassName: t.String,
  iconClassName: t.String,
  hasValue: t.Boolean,
  active: t.Boolean,
  small: t.Boolean,
  onButtonClick: t.maybe(t.Function),
  onInputClick: t.maybe(t.Function),
  onInputClear: t.maybe(t.Function),
  onInputKeyUp: t.Function
}, { strict: false })
export default class Input extends React.Component {

  getLocals(props) {
    const {
      value,
      iconClearClassName,
      iconClassName,
      hasValue,
      active,
      small,
      onButtonClick,
      onInputClick,
      onInputChange,
      onInputClear,
      onInputKeyUp,
      ...inputProps
    } = props;

    return {
      className: cx('react-datepicker-input', {
        'is-open': active,
        'has-value': hasValue,
        'is-small': small
      }),
      inputButtonProps: onButtonClick && {
        onButtonClick, iconClassName,
        className: cx('input-button', { active })
      },
      clearButtonProps: onInputClear && hasValue && {
        onInputClear, iconClearClassName
      },
      inputProps: {
        value,
        onChange: onInputChange,
        onClick: onInputClick,
        onKeyUp: onInputKeyUp,
        ...inputProps
      }
    };
  }

  templateInputButton({ className, onButtonClick, iconClassName }) {
    return (
      <View shrink={false} className={className} onClick={onButtonClick}>
        <i className={iconClassName} />
      </View>
    );
  }

  templateClearButton({ onInputClear, iconClearClassName }) {
    return (
      <View shrink={false} className='clear-button' onClick={onInputClear}>
        <i className={iconClearClassName} />
      </View>
    );
  }

  template({ className, inputButtonProps, clearButtonProps, inputProps }) {
    return (
      <div className={className}>
        <input {...inputProps} />
        <View className='button-wrapper' vAlignContent='center'>
          {clearButtonProps && this.templateClearButton(clearButtonProps)}
          {inputButtonProps && this.templateInputButton(inputButtonProps)}
        </View>
      </div>
    );
  }
}
