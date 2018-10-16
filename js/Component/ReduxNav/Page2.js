'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import Button from "./Button";
import AppSetting from "../../AppSetting";

class Page2 extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state={
            obj:{
                a:'1',
                b:'2'
            }
        }
    }

    static navigationOptions = ({ navigation,screenProps }) => ({
        headerTitle:'page2',
        headerRight:(
            <TouchableOpacity onPress={navigation.state.params.onRightButtonPress } style={{marginRight:10}}>
                <Text>{AppSetting.message}</Text>
            </TouchableOpacity>
        ),
        headerLeft:(
            <TouchableOpacity onPress={()=>{
                navigation.state.params.callback && navigation.state.params.callback();
                navigation.goBack()
            }} style={{marginLeft:10}}>
                <Image source={require('./img/icon_return_white.png')}/>
            </TouchableOpacity>
        ),
        //headerTintColor: '#fff'
    });

    render() {

        return (
            <View style={styles.container}>
                <Button title='点击跳转下一页' onPress={this._onPress}/>
                <Button title='点击右上角数字+1' onPress={this._onChangeNav}/>
            </View>
        );
    };

    _onPress = () => {
        this.props.navigation.navigate('NavPage3',{});
    };

    _onChangeNav = ()=>{
        AppSetting.message = (parseInt(AppSetting.message) + 1).toString();
        this.props.navigation.setParams({});

        this.setState({obj:{...this.state.obj,a:'2'}},()=>{
            console.log(this.state.obj)
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Page2;