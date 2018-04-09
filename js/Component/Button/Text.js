/**
 * Created by git on 17/8/25.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ReactNative, { Dimensions } from 'react-native';
const scale = Dimensions.get('window').width / 375;

class Heading1 extends
React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return (
            <ReactNative.Text style={styles.h1} {...this.props} />
        );
    }
}

function normalize(size: number): number {
    return Math.round(scale * size);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    h1: {
        fontSize: normalize(18),
        lineHeight: normalize(27),
        color: '#555454',
        fontWeight: 'bold',
    },
});

export default Heading1;