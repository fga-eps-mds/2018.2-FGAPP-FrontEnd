import React from 'react';
import PropTypes from 'prop-types';
import {ViewPropTypes} from 'react-native'
import {
  View,
} from 'react-native';

const ToogleView = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      { children }
    </View>
  );
};

ToogleView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ])),
  ]).isRequired,
  style: ViewPropTypes.style,
  hide: PropTypes.bool,
};

export default ToogleView;
