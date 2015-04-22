var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('expect');
var DatePickerInput = require('../DatePickerInput.jsx');

describe('DatePickerInput', function() {

  it('presents the DatePicker when clicking on the calendar button', function() {
    var inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} />
      </div>
    );

    var datePickers = TestUtils.scryRenderedDOMComponentsWithClass(inputWrapper, 'datepicker');
    expect(datePickers.length).toBe(0);

    var calendarButton = TestUtils.findRenderedDOMComponentWithClass(inputWrapper, 'ui icon button');
    TestUtils.Simulate.click(calendarButton);

    var datePickers = TestUtils.scryRenderedDOMComponentsWithClass(inputWrapper, 'datepicker');
    expect(datePickers.length).toBeGreaterThan(0);

  });
});
