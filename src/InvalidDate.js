import React from 'react';

const InvalidDate = React.createClass({

  propTypes: {
    invalidDate: React.PropTypes.string
  },

  render() {
    return (
      <div className='react-datepicker-body'>
        <h3 className='invalid-date'>{this.props.invalidDate}</h3>
      </div>
    );
  }
});

export default InvalidDate;
