import React, {PropTypes} from 'react';
import PickerTop from '../PickerTop';
import partial from 'lodash/function/partial';

const YearPickerTop = React.createClass({

  propTypes: {
    initialVisibleDate: PropTypes.any.isRequired,
    onChangeVisibleDate: PropTypes.func.isRequired
  },

  getInitialState() {
    return { visibleDate: this.props.initialVisibleDate.clone() };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ visibleDate: nextProps.initialVisibleDate });
  },

  changeYear(year) {
    this.setState({
      visibleDate: this.state.visibleDate.clone().year(year)
    }, () => this.props.onChangeVisibleDate(this.state.visibleDate));
  },

  render() {
    const year = this.state.visibleDate.year();
    const startDecadeYear = parseInt(year / 10, 10) * 10;
    const endDecadeYear = startDecadeYear + 9;
    return (
      <PickerTop
        fixed={true}
        nextDate={partial(this.changeYear, year + 10)}
        previousDate={partial(this.changeYear, year - 10)}
        value={startDecadeYear + '-' + endDecadeYear}
        valueClassName={this.props.textClassNames} />
    );
  }
});

export default YearPickerTop;
