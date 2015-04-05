'use strict';

import React, {PropTypes} from 'react';
import _ from 'lodash';

export const MonthPickerTop = React.createClass({

  propTypes: {
    visibleDate:      PropTypes.any.isRequired,
    onChangeDate:     PropTypes.func.isRequired,
    onChangeMode:     PropTypes.func.isRequired,
    fixed:            PropTypes.bool,
    classNamePrefix:  PropTypes.string.isRequired
  },

  changeYear(year) {
    this.props.visibleDate.year(year);
    this.props.onChangeDate(this.props.visibleDate);
  },

  changeMode() {
    if (!this.props.fixed) {
      this.props.onChangeMode('year');
    }
  },

  render() {
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

