/**
 * Created by git-wangjianying on 2017/11/20.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Switch from '../../Common/w-switch'
class index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {

        return (
            <View style={styles.container}>
                  <Switch/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },

});

export default index;