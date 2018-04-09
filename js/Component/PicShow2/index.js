/**
 * Created by git on 17/9/1.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import Autoresponsive from 'autoresponsive-react-native';

const Width = Dimensions.get('window').width
class index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {

        return (
            <ScrollView style={styles.container}>
                <Autoresponsive {...this.getAutoResponsiveProps()}>
                    <View style={{backgroundColor:'yellow',width:Width /2 -8,height:150}}/>
                    <View style={{backgroundColor:'green',width:Width /2 - 8,height:100}}/>
                    <View style={{backgroundColor:'green',width:Width /3 - 8,height:150}}/>
                    <View style={{backgroundColor:'yellow',width:Width /2 - 8,height:100}}/>
                    <View style={{backgroundColor:'yellow',width:Width /2 - 8,height:150}}/>
                    <View style={{backgroundColor:'green',width:Width /3 - 8,height:100}}/>
                    <View style={{backgroundColor:'yellow',width:Width /2 - 8,height:30}}/>
                    <View style={{backgroundColor:'green',width:Width /3 - 8,height:30}}/>
                    <View style={{backgroundColor:'red',width:Width /3 - 8,height:30}}/>
                    <View style={{backgroundColor:'blue',width:Width /3 - 8,height:30}}/>
                    <View style={{backgroundColor:'green',width:Width /3 - 8,height:100}}/>
                </Autoresponsive>
            </ScrollView>
        );
    }

    getAutoResponsiveProps() {
        return {
            itemMargin: 8,
        };
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default index;