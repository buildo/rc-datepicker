'use strict';

const React = require('react');
const _ = require('lodash');

const MonthPickerTop = React.createClass({

  propTypes: {
    visibleDate: React.PropTypes.any.isRequired,
    onChangeDate: React.PropTypes.func.isRequired,
    onChangeMode: React.PropTypes.func.isRequired,
    fixed: React.PropTypes.bool,
    classNamePrefix: React.PropTypes.string.isRequired
  },

  changeYear : function(year) {
    this.props.visibleDate.year(year);
    this.props.onChangeDate(this.props.visibleDate);
  },

  changeMode: function() {
    if (!this.props.fixed) {
      this.props.onChangeMode('year');
    }
  },

  render: function() {
    const year = this.props.visibleDate.year();
    return (
      <div className='top'>
        <div className='display'>
          <div className='button left' onClick={_.partial(this.changeYear, (year - 1))}>
            &lt;
          </div>
          <div className={'button label' + (this.props.fixed? ' fixed' : '')}  onClick={this.changeMode}>
            <strong className={this.props.textClassNames}>{year}</strong>
          </div>
          <div className='button right' onClick={_.partial(this.changeYear, (year + 1))}>
            &gt;
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MonthPickerTop;
