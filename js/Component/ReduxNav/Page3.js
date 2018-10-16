'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Button from "./Button";
import {NavigationActions} from "react-navigation";

class Page3 extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: 'page3',
    });

    render() {

        return (
            <View style={styles.container}>
                <Button title='点击重置路由，并跳回首页' onPress={this._onToTab}/>
                <Button title='点击重置路由，并跳回Page1' onPress={this._onToPage1}/>
                <Button title='点击跳回路由顶部' onPress={this._onToTop}/>
            </View>
        );
    };

    _onToTab = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Tab', params: {token: '123456'}}),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    _onToPage1 = () => {
        const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'Tab', params: {token: '123456'}}),
                NavigationActions.navigate({routeName: 'NavPage1', params: {token: '123456'}}),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    _onToTop = () => {
        this.props.navigation.popToTop();
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Page3;