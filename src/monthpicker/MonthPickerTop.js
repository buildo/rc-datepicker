import React, { PropTypes } from 'react';
import partial from 'lodash/partial';
import PickerTop from '../PickerTop';

const MonthPickerTop = React.createClass({

  propTypes: {
    visibleDate: PropTypes.any.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    changeYear: PropTypes.func.isRequired,
    textClassNames: PropTypes.string,
    fixedMode: PropTypes.bool
  },

  changeMode() {
    if (!this.props.fixedMode) {
      this.props.onChangeMode('year');
    }
  },

  render() {
    const year = this.props.visibleDate.year();
    return (
      <PickerTop
        fixed={this.props.fixedMode}
        value={year}
        handleClick={this.changeMode}
        previousDate={partial(this.props.changeYear, (year - 1))}
        nextDate={partial(this.props.changeYear, (year + 1))}
        valueClassName={this.props.textClassNames}
      />
    );
  }
});

export default MonthPickerTop;
