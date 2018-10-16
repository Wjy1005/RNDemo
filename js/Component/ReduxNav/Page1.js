'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity, Image, InteractionManager} from 'react-native';
import Button from "./Button";
import AppSetting from "../../AppSetting";

class Page1 extends React.Component {

    constructor(props, context) {
        super(props, context);
    };

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: 'page1',
        headerRight: (
            <TouchableOpacity onPress={navigation.state.params.onRightButtonPress} style={{marginRight: 10}}>
                <Text>{AppSetting.message}</Text>
            </TouchableOpacity>
        ),
        headerTintColor: navigation.state.params.headerTintColor || 'yellow',
    });

    render() {
        return (
            <View style={styles.container}>
                <Button title='点击跳转下一页' onPress={this._onPress}/>
                <Button title='点击修改Nav样式' onPress={this._onChangeNav}/>
            </View>
        );
    };

    componentWillMount() {
        this.props.navigation.setParams({
            onRightButtonPress: this.onRightButtonPress,
        })
    };

    _onPress = () => {
        this.props.navigation.navigate('NavPage2', {callback: this._callback});
    };

    _onChangeNav = () => {
        //刷新导航
        this.props.navigation.setParams({
            headerTintColor: '#ddd'
        });
    };

    _callback = () => {
        InteractionManager.runAfterInteractions(() => {
            //刷新导航
            this.props.navigation.setParams({
                headerTintColor: 'black'
            });
            console.log('来自page2');
        })
    };

    onRightButtonPress = () => {
        console.log('点击了右键');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Page1;