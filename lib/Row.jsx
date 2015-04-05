'use strict';

import React, {PropTypes} from 'react';

export const Row = React.createClass({

  propTypes: {
    pickers:  PropTypes.array.isRequired,
    mode:     PropTypes.string.isRequired
  },

  render() {
    return (
      <div className={'row ' + this.props.mode}>
        {this.props.pickers}
      </div>
    );
  }

});
