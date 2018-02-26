import 'moment/locale/fr';
import 'moment/locale/de';

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import { DatePickerInput, DatePicker } from '../../src';

describe('DatePickerInput', () => {

  it('presents the DatePicker when clicking on the calendar button', () => {

    const input = TestUtils.renderIntoDocument(<DatePickerInput onChange={() => {}} />);

    let datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(0);

    const calendarButton = TestUtils.findRenderedDOMComponentWithClass(input, 'input-button');
    TestUtils.Simulate.click(calendarButton);

    datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(1, 'DatePicker was not displayed after clicking on the calendar button');

  });

  it('presents the DatePicker when clicking on the input area', () => {

    const input = TestUtils.renderIntoDocument(<DatePickerInput onChange={() => {}} showOnInputClick />);

    let datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(0);

    const datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(input, 'input');
    TestUtils.Simulate.click(datePickerInputArea);

    datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(1, 'DatePicker was not displayed after clicking on the input area');

  });

  it('should pass the name prop down to the underlying input field', () => {

    const input = TestUtils.renderIntoDocument(<DatePickerInput onChange={() => {}} name='foobar' />);

    const datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(input, 'input');
    expect(datePickerInputArea.name).toBe('foobar', `Underlying input's 'name' prop is '${datePickerInputArea.name}' instead of 'foobar'`);

  });

  it('DatePicker should be floating above content', () => {

    const input = TestUtils.renderIntoDocument(<DatePickerInput onChange={() => {}} />);

    const input2 = TestUtils.renderIntoDocument(<DatePickerInput onChange={() => {}} />);

    const wrapper1 = TestUtils.findRenderedDOMComponentWithClass(input, 'react-datepicker-component');

    const calendarButton = TestUtils.findRenderedDOMComponentWithClass(input2, 'input-button');
    TestUtils.Simulate.click(calendarButton);

    const wrapper2 = TestUtils.findRenderedDOMComponentWithClass(input2, 'react-datepicker-component');

    const previousHeight = wrapper1.clientHeight;
    const newHeight = wrapper2.clientHeight;
    expect(newHeight).toBe(previousHeight, `datepicker component height is ${newHeight} instead of ${previousHeight}`);

  });

  it('DatePickers should have correct locales', () => {

    const inputFr = TestUtils.renderIntoDocument(<DatePicker onChange={() => {}} locale='fr' className='french' />);
    const inputDe = TestUtils.renderIntoDocument(<DatePicker onChange={() => {}} locale='de' className='german' />);

    const frenchWeekDays = TestUtils.scryRenderedDOMComponentsWithClass(inputFr, 'week-day');
    const germanWeekDays = TestUtils.scryRenderedDOMComponentsWithClass(inputDe, 'week-day');

    expect(frenchWeekDays[0].innerHTML).toBe('lu', 'First DatePicker is not in french');
    expect(germanWeekDays[0].innerHTML).toBe('Mo', 'Second DatePicker is not in german');

  });


  it('DatePicker should work with valueLink', () => {

    let date = new Date('2015-07-15');

    const onChange = (jsDate) => {
      date = jsDate;
    };

    const valueLink = {
      value: date,
      requestChange: onChange
    };

    const input = TestUtils.renderIntoDocument(<DatePickerInput locale='de' valueLink={valueLink} showOnInputClick />);

    const datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(input, 'input');
    TestUtils.Simulate.click(datePickerInputArea);
    expect(datePickerInputArea.value).toBe('15.07.2015', 'initial value is wrong');

    const pickerButton = TestUtils.scryRenderedDOMComponentsWithClass(input, 'react-datepicker-picker')[0];
    TestUtils.Simulate.click(pickerButton);
    expect(datePickerInputArea.value).toBe('29.06.2015', 'displayed value didn\'t change correctly');

    const formattedDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('.');
    expect(formattedDate).toBe('29.6.2015', 'stored value didn\'t change correctly');

  });

  it('DatePicker should close on select date', () => {

    const input = TestUtils.renderIntoDocument(<DatePickerInput onChange={() => {}} showOnInputClick autoClose />);

    let datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(0);

    const datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(input, 'input');
    TestUtils.Simulate.click(datePickerInputArea);

    datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(1);

    const pickerButton = TestUtils.scryRenderedDOMComponentsWithClass(input, 'react-datepicker-picker')[0];
    TestUtils.Simulate.click(pickerButton);

    datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(0, 'DatePicker didn\'t close correctly');

  });

  it('DatePicker should close on enter key event on input', () => {

    const input = TestUtils.renderIntoDocument(<DatePickerInput onChange={() => {}} showOnInputClick />);

    let datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(0);

    const datePickerInputArea = TestUtils.findRenderedDOMComponentWithTag(input, 'input');
    TestUtils.Simulate.click(datePickerInputArea);

    datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(1);

    TestUtils.Simulate.keyUp(datePickerInputArea, { keyCode: 13 });

    datePickers = TestUtils.scryRenderedComponentsWithType(input, DatePicker);
    expect(datePickers.length).toBe(0, 'DatePicker didn\'t close correctly');

  });

});
