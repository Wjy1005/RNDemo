'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

class Button extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {title, onPress} = this.props;
        return (
            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text>{title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        width:140,
        height:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#dddddd',
        borderRadius: 5,
        margin: 10
    }
});

export default Button;