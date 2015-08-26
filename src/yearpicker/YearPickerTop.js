import React, {PropTypes} from 'react';
import PickerTop from '../PickerTop';
import partial from 'lodash/function/partial';

const YearPickerTop = React.createClass({

  propTypes: {
    initialVisibleDate: PropTypes.any.isRequired,
    onChangeVisibleDate: PropTypes.func.isRequired
  },

  render() {
    const year = this.props.visibleDate.year();
    const startDecadeYear = parseInt(year / 10, 10) * 10;
    const endDecadeYear = startDecadeYear + 9;
    return (
      <PickerTop
        fixed={true}
        nextDate={partial(this.props.changeYear, year + 10)}
        previousDate={partial(this.props.changeYear, year - 10)}
        value={startDecadeYear + '-' + endDecadeYear}
        valueClassName={this.props.textClassNames} />
    );
  }
});

export default YearPickerTop;
