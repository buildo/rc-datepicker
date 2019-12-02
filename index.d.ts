import * as React from 'react';
import * as moment from 'moment';

export type Mode = {
  'day': string,
  'month': string,
  'year': string
};

export type Position = 'top' | 'bottom';

export type Value = string | Date | moment.Moment  ; // | MomentDate 

export type ValueLink = {
  value? : Value,
  requestChange(e: Date): void
}

export type DateOnChangeHandler = {
  (jsDate: Date, dateString: string): void;
}

export interface DatePickerInputProps {
  value?: Value,
  valueLink?: ValueLink,
  onChange?: DateOnChangeHandler,
  onShow?: () => void,
  onHide?: () => void,
  onClear?: () => void,
  small?: boolean,
  defaultValue?: Value,
  minDate?: Value,
  maxDate?: Value,
  locale?: string,
  startMode?: Mode,
  fixedMode?: boolean,
  displayFormat?: string,
  returnFormat?: string,
  format?: string,
  validationFormat?: string,
  showOnInputClick?: boolean,
  closeOnClickOutside?: boolean,
  showInputButton?: boolean,
  autoClose?: boolean,
  floating?: boolean,
  disabled?: boolean,
  position?: Position,
  iconClassName?: string,
  iconClearClassName?: string,
  className?: string, // used to omit from inputProps
  style?: object, // used to omit from inputProps
  placeholder?: string
}

export class DatePickerInput extends React.Component<DatePickerInputProps, {}> {}

export interface DatePickerProps {
  onChange?: DateOnChangeHandler;
  value?: Value,
  valueLink?: ValueLink,
  defaultValue?: Value,
  minDate?: Value,
  maxDate?: Value,
  locale?: string,
  startMode?: Mode,
  fixedMode?: boolean,
  returnFormat?: string,
  floating?: boolean,
  closeOnClickOutside?: boolean, // used only with DatePickerInput
  className?: string,
  prevIconClassName?: string,
  nextIconClassName?: string,
  position: Position,
  style?: object,
  placeholder?: string
}

export class DatePicker extends React.Component<DatePickerProps, void> {}
