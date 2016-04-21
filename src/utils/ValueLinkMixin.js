export default {
  getValueLink(_props) {
    const props = _props || this.props;
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    };
  }
};
