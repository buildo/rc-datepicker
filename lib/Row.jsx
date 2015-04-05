'use strict';

import React from 'react';

const Row = React.createClass({

  propTypes: {
    pickers:  React.PropTypes.array.isRequired,
    mode:     React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className={'row ' + this.props.mode}>
        {this.props.pickers}
      </div>
    );
  }

});

export default Row;
