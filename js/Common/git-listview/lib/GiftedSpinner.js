'use strict'

import React from 'react';
import {
    View,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Platform
} from 'react-native';
var createReactClass = require('create-react-class');
var GiftedSpinner = createReactClass({
  
  _getSpinner() {
    if (Platform.OS === 'android') {
      return (
        <ProgressBarAndroid 
          style={{
            height: 20,
          }}
          styleAttr="Inverse"
          {...this.props}
        />
      );
    } else {
      return (
        <ActivityIndicatorIOS
          animating={true}
          size="small"
          {...this.props}
        />
      );
    }
  },
  
  render() {
    return (
      <View>
        {this._getSpinner()}
      </View>
    );
  },
  
});


module.exports = GiftedSpinner;