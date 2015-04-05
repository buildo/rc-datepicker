'use strict';

import React from 'react';

const InvalidDate = React.createClass({

  propTypes: {
    invalidDate: React.PropTypes.string
  },

  render() {
    return (
      <div className='body'>
        <h3 className='invalid'>{this.props.invalidDate}</h3>
      </div>
    );
  }
});

export default InvalidDate;
