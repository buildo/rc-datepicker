# React Datepicker
A decent and pretty date picker to be used with React

`![](http://s10.postimg.org/o5hqerrtl/Screen_Shot_2015_07_03_at_12_59_25_PM.png)

```jsx
import fakeItalianImport from 'moment/locale/it.js'
import {DatePicker, DatePickerInput} from 'rc-datepicker';

const date = '2015-06-26' // or Date or Moment.js

onChange = (jsDate, dateString) => {
  // ...
}

React.renderComponent(
  <div>
    // this renders the full component (input and datepicker)
    <DatePickerInput
      onChange={onChange}
      date={date}
      className='my-custom-datepicker-component'
      {...anyReactInputProps}/>
    
    // this renders only a fixed datepicker
    <DatePicker onChange={onChange} date={date} />
  </div>,
  document.body);
```

You can see a live demo [here](https://cdn.rawgit.com/buildo/react-semantic-datepicker/master/examples/index.html)

or check the full examples [here](https://github.com/buildo/react-semantic-datepicker/tree/master/examples)

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
import fakeFrenchImport from 'moment/locale/fr.js' // or 'rc-datepicker/node_modules/locale/fr.js' if you don't have it in your node_modules folder

import {DatePickerInput} from 'rc-datepicker';
```
The DatePicker will now use French locales.

#####Locales as props
You can switch between locales also by passing the prop "locale" to the datepicker. **WATCH OUT** this method requires the wanted locale to be already available in your bundle which is true if you had already imported it or if you're using ```moment-with-locales.min.js```

```jsx
<DatePicker locale='es' />
```




