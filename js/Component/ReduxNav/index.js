'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Button from './Button'

class index extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <View style={styles.container}>
                <Button title='点击跳转下一页' onPress={this._onPress}/>
            </View>
        );
    }

    _onPress = () => {
        this.props.navigation.navigate('NavPage1',{});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default index;