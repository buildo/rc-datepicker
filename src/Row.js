
import React from 'react';

const Row = React.createClass({

  /* eslint-disable key-spacing */
  propTypes: {
    pickers: React.PropTypes.array.isRequired,
    mode:    React.PropTypes.string.isRequired
  },
  /* eslint-enable key-spacing */

  render() {
    return (
      <div className={'react-datepicker-row ' + this.props.mode}>
        {this.props.pickers}
      </div>
    );
  }

});

export default Row;
