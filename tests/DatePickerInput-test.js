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
    expect(datePickers.lenght).toBe(1, "DatePicker was not displayed after clicking on the calendar button");

  });
});
