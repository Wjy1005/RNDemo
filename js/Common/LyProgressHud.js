'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import GitModal from '../common/git-root-modal'

export class LyProgressHud extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.dialog}>
                    <ActivityIndicator size="large" color="#ddd"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'transparent',
    },
    dialog:{
        width:80,
        height:80,
        borderRadius:10,
        backgroundColor:'rgba(0,0,0,0.8)',
        justifyContent:'center',
        alignItems:'center',
    }
});

class Alert {
    static showHud(){
        GitModal.alert({
            backAndroid:false,
            component:(
                <LyProgressHud/>
            )
        })
    }

    static hideHud(){
        GitModal.onDismiss();
    }

}

export default Alert;


