[![NPM](https://nodei.co/npm/rc-datepicker.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rc-datepicker/)

# React Datepicker
A decent and pretty date picker to be used with React

![ScreenShot](http://s2.postimg.org/p0ih1vfx5/Screen_Shot_2015_07_02_at_13_05_55.png)

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
      value={date}
      className='my-custom-datepicker-component'
      {...anyReactInputProps}/>
    
    // this renders only a fixed datepicker
    <DatePicker onChange={onChange} value={date} />
  </div>,
  document.body);
```

You can see a live demo [here](https://cdn.rawgit.com/buildo/react-semantic-datepicker/master/examples/index.html)

or check the full examples [here](https://github.com/buildo/react-semantic-datepicker/tree/master/examples)

**FOR WEBPACK USERS:** webpack by default imports every locale. Please take a look at [this question](http://stackoverflow.com/questions/25384360/how-to-prevent-moment-js-from-loading-locales-with-webpack) on Stack Overflow for possible solutions.

###Install
```
npm install --save rc-datepicker
```
The npm package is compiled in JavaScript 5

###v3.x BREAKING CHANGES
`format` prop has been replaced by `displayFormat` (formats date in `<input>`. It's what final user sees) and `returnFormat` (formats date before returning it in `onChange`. Maybe useful to developers to unify output format)

###v2.x BREAKING CHANGES
```date``` and ```initialDate``` have been replaced with ```value``` and ```defaultValue```

###DatePickerInput
supports any props of the base React input component. In addition you can pass:
```jsx
onChange:             React.PropTypes.func.isRequired,
onShow:               React.PropTypes.func, // on show DatePicker callback
onHide:               React.PropTypes.func, // on hide DatePicker callback
value:                DateUtils.evaluateDateProp,
valueLink:            React.PropTypes.shape({
                        value: DateUtils.evaluateDateProp,
                        requestChange: React.PropTypes.func.isRequired
                      }),
defaultValue:         DateUtils.evaluateDateProp,
minDate:              DateUtils.evaluateDateProp,
maxDate:              DateUtils.evaluateDateProp,
locale:               React.PropTypes.string,
startMode:            React.PropTypes.string, // ('day', 'month', 'year')
fixedMode:            React.PropTypes.bool,
displayFormat:        React.PropTypes.string,
returnFormat:         React.PropTypes.string,
showOnInputClick:     React.PropTypes.bool,
closeOnClickOutside:  React.PropTypes.bool,
showInputButton:      React.PropTypes.bool,
autoClose:            React.PropTypes.bool,
floating:             React.PropTypes.bool,
iconClassName:        React.PropTypes.string,
className:            React.PropTypes.string,
style:                React.PropTypes.object
```
Default values:
```jsx
onShow: () => {},
onHide: () => {},
startMode: 'day',
autoClose: true,
closeOnClickOutside: true,
floating: true,
showInputButton: true,
iconClassName: '',
className: '',
style: {}
```

###DatePicker
```jsx
onChange:            React.PropTypes.func.isRequired,
value:               DateUtils.evaluateDateProp,
valueLink:           React.PropTypes.shape({
                       value: DateUtils.evaluateDateProp,
                       requestChange: React.PropTypes.func.isRequired
                     }),
defaultValue:        DateUtils.evaluateDateProp,
minDate:             DateUtils.evaluateDateProp,
maxDate:             DateUtils.evaluateDateProp,
locale:              React.PropTypes.string,
startMode:           React.PropTypes.string,
fixedMode:           React.PropTypes.bool,
floating:            React.PropTypes.bool,
className:           React.PropTypes.string,
style:               React.PropTypes.object
```
Default values:
```jsx
startMode: 'day',
className: '',
style: {}
```

###Locales
DatePicker and DatePickerInput use **Moment.js**, therefore theu support any locale inside "moment/locale".

To select a locale you need to require it **before** requiring the datepicker or moment anywhere in your app: this way it will be automatically selected as current locale.
```
import fakeFrenchImport from 'moment/locale/fr.js' // or 'rc-datepicker/node_modules/moment/locale/fr.js' if you don't have it in your node_modules folder

import {DatePickerInput} from 'rc-datepicker';
```
The DatePicker will now use French locales.

#####Locales as props
You can switch between locales also by passing the prop "locale" to the datepicker. **WATCH OUT** this method requires the wanted locale to be already available in your bundle which is true if you had already imported it or if you're using ```moment-with-locales.min.js```

```jsx
<DatePicker locale='es' />
```

###Style
To use DatePicker and DatePickerInput default style you should add it to your vendor styles.
You can find it in the ```lib``` folder as ```style.css``` (```node_modules/rc-datepicker/lib/style.css```).




###Examples
```shell
$ npm install
$ npm start
$ open http://localhost:8080
```
