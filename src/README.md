# DatePickerInput

A decent and pretty date picker to be used with React

## Props
|Name|Type|Default|Description|
|----|----|-------|-----------|
| **value** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Current date |
| **valueLink** | <code>{value: ?String &#124; Date &#124; MomentDate, requestChange: Function}</code> |  | *optional*. ValueLink object to replace "value" and "onChange" |
| **onChange** | <code>{jsDate: Date, dateString: string}</code> |  | *optional*. Called when value changes |
| **onShow** | <code>Function</code> | <code>"onShow"</code> | *optional*. Called when datepicker is opened |
| **onHide** | <code>Function</code> | <code>"onHide"</code> | *optional*. Called when datepicker is closed |
| **onClear** | <code>Function</code> |  | *optional*. Called when value is cleared |
| **small** | <code>Boolean</code> | <code>false</code> | *optional*. Whether it's small or not |
| **defaultValue** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Default date |
| **minDate** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Minimum date selectable by the user |
| **maxDate** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Maximum date selectable by the user |
| **locale** | <code>String</code> |  | *optional*. Locale used for translations |
| **startMode** | <code>enum("day" &#124; "month" &#124; "year")</code> | <code>"day"</code> | *optional*. The start view of the datepicker |
| **startDate** | <code>union(String &#124; Date &#124; MomentDate)</code> |  | *optional*. Specify an initial "visible" date with no need to select a defaultValue |
| **fixedMode** | <code>Boolean</code> |  | *optional*. Whether the user can use multiple views or not |
| **displayFormat** | <code>String</code> |  | *optional*. MomentJS format used to display current date |
| **returnFormat** | <code>String</code> |  | *optional*. MomentJS format used to format date before returing through "onChange" |
| **format** | <code>String</code> |  | *optional*. MomentJS format used to format date before returing through "onChange" |
| **validationFormat** | <code>String</code> |  | *optional*. MomentJS format used to format date before returing through "onChange" |
| **showOnInputClick** | <code>Boolean</code> |  | *optional*. Whether the datepicker should open when user click on the input |
| **closeOnClickOutside** | <code>Boolean</code> | <code>true</code> | *optional*. Whether the datepicker should close when user clicks outside of it |
| **showInputButton** | <code>Boolean</code> | <code>true</code> | *optional*. Whether the input-button should be rendered |
| **autoClose** | <code>Boolean</code> | <code>true</code> | *optional*. Pass true if you want the datepicker to close automatically after the user selects a value |
| **floating** | <code>Boolean</code> | <code>true</code> | *optional*. Whether the datepicker should float over the page content (absolute position) |
| **disabled** | <code>Boolean</code> |  | *optional*. Whether the datepicker should be disabled or not |
| **position** | <code>enum("top" &#124; "bottom")</code> | <code>"bottom"</code> | *optional*. Whether the datepicker should be rendered above or below the input field |
| **iconClassName** | <code>String</code> | <code>"icon-rc-datepicker icon-rc-datepicker_calendar"</code> | *optional*. Classname used for the icon |
| **iconClearClassName** | <code>String</code> | <code>"icon-rc-datepicker icon-rc-datepicker_clear"</code> | *optional*. Classname used for the clear icon |
| **className** | <code>String</code> | <code>""</code> | *optional*. ClassName used for the wrapper div |
| **style** | <code>Object</code> | <code>{}</code> | *optional*. Style used for the wrapper div |
| **placeholder** | <code>String</code> |  | *optional*.  |