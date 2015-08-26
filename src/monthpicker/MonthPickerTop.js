import React, {PropTypes} from 'react';
import partial from 'lodash/function/partial';
import PickerTop from '../PickerTop';

const MonthPickerTop = React.createClass({

  propTypes: {
    initialVisibleDate: PropTypes.any.isRequired,
    onChangeVisibleDate: PropTypes.func.isRequired,
    onChangeMode: PropTypes.func.isRequired,
    fixedMode: PropTypes.bool
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

  changeMode() {
    if (!this.props.fixedMode) {
      this.props.onChangeMode('year');
    }
  },

  render() {
    const year = this.state.visibleDate.year();
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
