/** @jsx React.DOM */

'use strict';

const React = require('react');

const Row = React.createClass(/** @lends {React.ReactComponent.prototype} */{

  propTypes: {
    pickers: React.PropTypes.array.isRequired,
    mode: React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div className={'row ' + this.props.mode}>
        {this.props.pickers}
      </div>
    );
  }

});

module.exports = Row;