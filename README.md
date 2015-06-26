[![Build Status](https://travis-ci.org/buildo/react-semantic-datepicker.svg?branch=master)](https://travis-ci.org/buildo/react-semantic-datepicker) [![Coverage Status](https://coveralls.io/repos/buildo/react-semantic-datepicker/badge.svg?branch=master)](https://coveralls.io/r/buildo/react-semantic-datepicker?branch=master)

# React Datepicker
A decent and pretty date picker to be used with React

```jsx
import fakeItalianImport from 'moment/locale/it.js'
import {DatePicker, DatePickerInput} from 'rc-datepicker';

const date = '2015-06-26' // or Date or Moment.js

onChange = (jsDate, dateString) => {
  // ...
}

React.renderComponent(
  <div>
    <DatePickerInput onChange={() => {}} date={date} {...anyReactInputProps}/>
    <DatePicker {date} />
  </div>,
  document.body);
```

###Install
```
npm install --save rc-datepicker
```

###DatePickerInput
supports any props of the base React input component. In addition you can pass:
```jsx
  onChange:         React.PropTypes.func.isRequired,
  date:             DateUtils.evaluateDateProp,
  initialDate:      DateUtils.evaluateDateProp,
  minDate:          DateUtils.evaluateDateProp,
  maxDate:          DateUtils.evaluateDateProp,
  locale:           React.PropTypes.string,
  startMode:        React.PropTypes.string,
  fixedMode:        React.PropTypes.bool,
  format:           React.PropTypes.string,
  showOnInputClick: React.PropTypes.bool,
  autoClose:        React.PropTypes.bool,
  floating:         React.PropTypes.bool
```
Default values:
```jsx
  startMode: 'day',
  autoClose: true,
  floating: true
```

###DatePicker
```jsx
  onChange:    React.PropTypes.func.isRequired,
  date:        DateUtils.evaluateDateProp,
  initialDate: DateUtils.evaluateDateProp,
  minDate:     DateUtils.evaluateDateProp,
  maxDate:     DateUtils.evaluateDateProp,
  locale:      React.PropTypes.string,
  startMode:   React.PropTypes.string,
  fixedMode:   React.PropTypes.bool,
  floating:    React.PropTypes.bool
```
Default values:
```jsx
  startMode: 'day'
```

###Locales
DatePicker and DatePickerInput use **Moment.js**, therefore theu support any locale inside "moment/locale".

To select a locale you need to require it **before** requiring the datepicker or moment anywhere in your app: this way it will be automatically selected as current locale.
```
import fakeFrenchImport from 'moment/locale/fr.js'

import {DatePickerInput} from 'rc-datepicker';
```
The DatePicker will now use French locales.

#####Locales as props
You can switch between locales also by passing the prop "locale" to the datepicker. **WATCH OUT** this method requires the wanted locale to be already available in your bundle which is true if you had already imported it or if you're using ```moment-with-locales.min.js```

```jsx
<DatePicker locale='es' />
```




