/**
 * Created by git on 17/8/31.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Platform} from 'react-native';
import TestDemoModule from './TestDemo'

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
                <Text>从Android的MainActivity里获取值</Text>
            </View>
        );
    }

    componentDidMount() {
        if(Platform.OS === 'ios'){

        }else{
            TestDemoModule.show('111111',(json)=>{
                console.log(json)
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default index;