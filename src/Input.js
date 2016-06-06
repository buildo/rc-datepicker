import React from 'react';
import cx from 'classnames';
import { props } from 'tcomb-react';
import t from 'tcomb';
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
      <div className={className} onClick={onButtonClick}>
        <i className={iconClassName} />
      </div>
    );
  }

  templateClearButton({ onInputClear, iconClearClassName }) {
    return (
      <div className='clear-button' onClick={onInputClear}>
        <i className={iconClearClassName} />
      </div>
    );
  }

  template({ className, inputButtonProps, clearButtonProps, inputProps }) {
    return (
      <div className={className}>
        <input {...inputProps} />
        <div className='button-wrapper'>
          {inputButtonProps && this.templateInputButton(inputButtonProps)}
          {clearButtonProps && this.templateClearButton(clearButtonProps)}
        </div>
      </div>
    );
  }
}
