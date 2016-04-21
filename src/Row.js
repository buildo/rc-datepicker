import React, { PropTypes } from 'react';

const Row = React.createClass({

  propTypes: {
    pickers: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired
  },

  render() {
    return (
      <div className={`react-datepicker-row ${this.props.mode}`}>
        {this.props.pickers}
      </div>
    );
  }

});

export default Row;
