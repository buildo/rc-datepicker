import React from 'react';
import partial from 'lodash/function/partial';

const MonthPickerTop = React.createClass({

  propTypes: {
    visibleDate: React.PropTypes.any.isRequired,
    onChangeVisibleDate: React.PropTypes.func.isRequired,
    onChangeMode: React.PropTypes.func.isRequired,
    fixedMode: React.PropTypes.bool
  },

  changeYear(year) {
    this.props.visibleDate.year(year);
    this.props.onChangeVisibleDate(this.props.visibleDate);
  },

  changeMode() {
    if (!this.props.fixedMode) {
      this.props.onChangeMode('year');
    }
  },

  render() {
    const year = this.props.visibleDate.year();
    const fixed = this.props.fixedMode ? 'fixed' : '';
    return (
      <div className='react-datepicker-top'>
        <div className='display'>
          <div className='react-datepicker-button button-left' onClick={partial(this.changeYear, (year - 1))}>
            &lt;
          </div>
          <div className={`react-datepicker-button button-label ${fixed}`} onClick={this.changeMode}>
            <strong className={this.props.textClassNames}>{year}</strong>
          </div>
          <div className='react-datepicker-button button-right' onClick={partial(this.changeYear, (year + 1))}>
            &gt;
          </div>
        </div>
      </div>
    );
  }
});

export default MonthPickerTop;
