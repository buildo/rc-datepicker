'use strict';

import React, {PropTypes} from 'react';

export const InvalidDate = React.createClass({

  propTypes: {
    invalidDate: PropTypes.string
  },

  render() {
    return (
      <div className='body'>
        <h3 className='invalid'>{this.props.invalidDate}</h3>
      </div>
    );
  }
});
