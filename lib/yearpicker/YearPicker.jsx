'use strict';

const React = require('react'),
  YearPickerTop = require('./YearPickerTop.jsx'),
  YearPickerBody = require('./YearPickerBody.jsx');

const YearPicker = React.createClass({

  propTypes: {
    visibleDate: React.PropTypes.any.isRequired,
    selectedDate: React.PropTypes.any,
    onChangeDate: React.PropTypes.func.isRequired,
    onSelectDate: React.PropTypes.func.isRequired,
    onChangeMode: React.PropTypes.func.isRequired,
    mode: React.PropTypes.string.isRequired,
    fixed: React.PropTypes.bool,
    classNamePrefix: React.PropTypes.string.isRequired
  },

  _onSelectDate: function(date) {
    if (this.props.fixed) {
      this.props.onSelectDate(date);
    } else {
      this.props.onChangeDate(date);
      this.props.onChangeMode('month');
    }
  },

  render: function () {
    return (
      <div className={this.props.classNamePrefix + ' container year'}>
        <YearPickerTop
          visibleDate={this.props.visibleDate}
          onChangeDate={this.props.onChangeDate}
          classNamePrefix={this.props.classNamePrefix} />
        <YearPickerBody
          visibleDate={this.props.visibleDate}
          selectedDate={this.props.selectedDate}
          onSelectDate={this._onSelectDate}
          mode={this.props.mode}
          classNamePrefix={this.props.classNamePrefix} />
      </div>
    );
  }
});

module.exports = YearPicker;
