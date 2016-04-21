import React, { PropTypes } from 'react';
import PickerTop from '../PickerTop';
import partial from 'lodash/partial';

const YearPickerTop = React.createClass({

  propTypes: {
    visibleDate: PropTypes.any.isRequired,
    changeYear: PropTypes.func.isRequired,
    textClassNames: PropTypes.string
  },

  render() {
    const year = this.props.visibleDate.year();
    const startDecadeYear = parseInt(year / 10, 10) * 10;
    const endDecadeYear = startDecadeYear + 9;
    return (
      <PickerTop
        fixed
        nextDate={partial(this.props.changeYear, year + 10)}
        previousDate={partial(this.props.changeYear, year - 10)}
        value={`${startDecadeYear}-${endDecadeYear}`}
        valueClassName={this.props.textClassNames}
      />
    );
  }
});

export default YearPickerTop;
