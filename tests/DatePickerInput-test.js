var jsdom = require('mocha-jsdom');
var expect = require('expect');
var $ = require('jquery');

describe('DatePickerInput', function() {
  jsdom();

  it('presents the DatePicker when clicking on the calendar button', function() {
    var React = require('react/addons');
    var {DatePickerInput, DatePicker} = require('../dist/react-semantic-datepicker.min.js');
    var TestUtils = React.addons.TestUtils;

    var inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} />
      </div>
    );

    var datePickers = TestUtils.scryRenderedComponentsWithType(inputWrapper, DatePicker);
    expect(datePickers.length).toBe(0);

    var calendarButton = TestUtils.findRenderedDOMComponentWithClass(inputWrapper, 'ui icon button');
    TestUtils.Simulate.click(calendarButton);

    var datePickers = TestUtils.scryRenderedComponentsWithType(inputWrapper, DatePicker);
    expect(datePickers.length).toBe(1, "DatePicker was not displayed after clicking on the calendar button");

  });

  it('presents the DatePicker when clicking on the input area', function() {
    var React = require('react/addons');
    var {DatePickerInput, DatePicker} = require('../dist/react-semantic-datepicker.min.js');
    var TestUtils = React.addons.TestUtils;

    var inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} showOnInputClick={true} />
      </div>
    );

    var datePickers = TestUtils.scryRenderedComponentsWithType(inputWrapper, DatePicker);
    expect(datePickers.length).toBe(0);

    var datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(inputWrapper, 'input');
    TestUtils.Simulate.click(datePickerInputArea);

    var datePickers = TestUtils.scryRenderedComponentsWithType(inputWrapper, DatePicker);
    expect(datePickers.length).toBe(1, "DatePicker was not displayed after clicking on the input area");

  });

  it('should pass the name prop down to the underlying input field', function() {
    var React = require('react/addons');
    var {DatePickerInput} = require('../dist/react-semantic-datepicker.min.js');
    var TestUtils = React.addons.TestUtils;

    var inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} name='foobar' />
      </div>
    );

    var datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(inputWrapper, 'input');
    expect(datePickerInputArea.props.name).toBe('foobar', 'Underlying input\'s \'name\' prop is \'' + datePickerInputArea.props.name + '\' intead of \'foobar\'');

  });


});
