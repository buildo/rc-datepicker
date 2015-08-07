import React from 'react';
import partial from 'lodash/function/partial';

const YearPickerTop = React.createClass({

  propTypes: {
    visibleDate: React.PropTypes.any.isRequired,
    onChangeVisibleDate: React.PropTypes.func.isRequired
  },

  changeYear(year) {
    this.props.visibleDate.year(year);
    this.props.onChangeVisibleDate(this.props.visibleDate);
  },

  render() {
    const year = this.props.visibleDate.year();
    const startDecadeYear = parseInt(year / 10, 10) * 10;
    const endDecadeYear = startDecadeYear + 9;
    return (
      <div className='react-datepicker-top'>
        <div className='display'>
          <div className='react-datepicker-button button-left' onClick={partial(this.changeYear, (year - 10))}>
            &lt;
          </div>
          <div className='react-datepicker-button button-label fixed'>
            <strong className={this.props.textClassNames}>{startDecadeYear}-{endDecadeYear}</strong>
          </div>
          <div className='react-datepicker-button button-right' onClick={partial(this.changeYear, (year + 10))}>
            &gt;
          </div>
        </div>
      </div>
    );
  }
});

export default YearPickerTop;
