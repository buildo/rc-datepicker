/** @jsx React.DOM */

'use strict';

const React = require('react');

const InvalidDate = React.createClass({

  propTypes: {
    invalidDate: React.PropTypes.string
  },

  render: function () {
    return (
      <div className='body'>
        <h3 className='invalid'>{this.props.invalidDate}</h3>
      </div>
    );
  }
});

module.exports = InvalidDate;