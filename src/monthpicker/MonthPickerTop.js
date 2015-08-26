import React, {PropTypes} from 'react';
import partial from 'lodash/function/partial';
import PickerTop from '../PickerTop';

const MonthPickerTop = React.createClass({

  propTypes: {
    visibleDate: PropTypes.any.isRequired,
    onChangeVisibleDate: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    fixedMode: PropTypes.bool
  },

  changeYear(year) {
    this.props.visibleDate.year(year);
    this.props.onChangeVisibleDate(this.props.visibleDate);
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
        previousDate={partial(this.changeYear, (year - 1))}
        nextDate={partial(this.changeYear, (year + 1))}
        valueClassName={this.props.textClassNames} />
    );
  }
});

export default MonthPickerTop;
