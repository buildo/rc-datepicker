var jsdom = require('mocha-jsdom');
var assert = require('assert');

describe('DatePickerInput', function() {
  jsdom();

  it('presents the DatePicker when clicking on the calendar button', function() {
    var React = require('react/addons');
    var {DatePickerInput} = require('../dist/react-semantic-datepicker.min.js');
    var TestUtils = React.addons.TestUtils;

    var inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} />
      </div>
    );

    var datePickers = TestUtils.scryRenderedDOMComponentsWithClass(inputWrapper, 'datepicker');
    assert(datePickers.length === 0);

    var calendarButton = TestUtils.findRenderedDOMComponentWithClass(inputWrapper, 'ui icon button');
    TestUtils.Simulate.click(calendarButton);

    var datePickers = TestUtils.scryRenderedDOMComponentsWithClass(inputWrapper, 'datepicker');
    assert(datePickers.length > 0);

  });
});
