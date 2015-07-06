import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import expect from 'expect';
import fr from 'moment/locale/fr';
import de from 'moment/locale/de';
import {DatePickerInput, DatePicker} from '../../src';

describe('DatePickerInput', function() {

  it('presents the DatePicker when clicking on the calendar button', function() {

    const inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} />
      </div>
    );

    let datePickers = TestUtils.scryRenderedComponentsWithType(inputWrapper, DatePicker);
    expect(datePickers.length).toBe(0);

    const calendarButton = TestUtils.findRenderedDOMComponentWithClass(inputWrapper, 'input-button');
    TestUtils.Simulate.click(calendarButton);

    datePickers = TestUtils.scryRenderedComponentsWithType(inputWrapper, DatePicker);
    expect(datePickers.length).toBe(1, "DatePicker was not displayed after clicking on the calendar button");

  });

  it('presents the DatePicker when clicking on the input area', function() {

    const inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} showOnInputClick={true} />
      </div>
    );

    let datePickers = TestUtils.scryRenderedComponentsWithType(inputWrapper, DatePicker);
    expect(datePickers.length).toBe(0);

    const datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(inputWrapper, 'input');
    TestUtils.Simulate.click(datePickerInputArea);

    datePickers = TestUtils.scryRenderedComponentsWithType(inputWrapper, DatePicker);
    expect(datePickers.length).toBe(1, "DatePicker was not displayed after clicking on the input area");

  });

  it('should pass the name prop down to the underlying input field', function() {

    const inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} name='foobar' />
      </div>
    );

    const datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(inputWrapper, 'input');
    expect(datePickerInputArea.props.name).toBe('foobar', 'Underlying input\'s \'name\' prop is \'' + datePickerInputArea.props.name + '\' intead of \'foobar\'');

  });

  it('DatePicker should be floating above content', function() {

    const inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} />
      </div>
    );

    const inputWrapper2 = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePickerInput onChange={() => {}} />
      </div>
    );

    const wrapper1 = TestUtils.findRenderedDOMComponentWithClass(inputWrapper, 'react-datepicker-component');

    const calendarButton = TestUtils.findRenderedDOMComponentWithClass(inputWrapper2, 'input-button');
    TestUtils.Simulate.click(calendarButton);

    const wrapper2 = TestUtils.findRenderedDOMComponentWithClass(inputWrapper2, 'react-datepicker-component');

    const previousHeight = wrapper1.getDOMNode().clientHeight;
    const newHeight = wrapper2.getDOMNode().clientHeight;
    expect(newHeight).toBe(previousHeight, 'datepicker component height is ' + newHeight + ' instead of ' + previousHeight);

  });

  it('DatePickers should have correct locales', function() {

    const inputWrapper = TestUtils.renderIntoDocument(
      <div className='ui input'>
        <DatePicker onChange={() => {}} locale='fr' className='french' />
        <DatePicker onChange={() => {}} locale='de' className='german' />
      </div>
    );

    const FrenchDatePicker = TestUtils.findRenderedDOMComponentWithClass(inputWrapper, 'french');
    const GermanDatePicker = TestUtils.findRenderedDOMComponentWithClass(inputWrapper, 'german');

    const FrenchWeekDays = TestUtils.scryRenderedDOMComponentsWithClass(FrenchDatePicker, 'week-day');
    const GermanWeekDays = TestUtils.scryRenderedDOMComponentsWithClass(GermanDatePicker, 'week-day');

    expect(FrenchWeekDays[0].getDOMNode().innerHTML).toBe('Lu', 'First DatePicker is not in french');
    expect(GermanWeekDays[0].getDOMNode().innerHTML).toBe('Mo', 'Second DatePicker is not in german');

  });


});
