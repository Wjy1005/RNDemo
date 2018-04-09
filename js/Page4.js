/**
 * Created by git on 17/6/4.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TouchableWithoutFeedback, Platform} from 'react-native';
import AppSetting from './AppSetting'
import {NavigationActions} from 'react-navigation'
class Page4 extends React.Component
{
    constructor(props, context)
    {
        super(props, context);

        this.state={
            obj:{
                a:'1',
                b:'2'
            }
        }
    }
    static navigationOptions = ({ navigation,screenProps }) => ({
        headerTitle:'page4',
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
    })
    render()
    {
        console.warn('page4');
        return (
            <View style={styles.container}>
                <Text>Page4</Text>
                <TouchableOpacity onPress={this._onPress}>
                    <Text>点击右上角数字+1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Page5')}}>
                    <Text>点击跳转至下一页</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onPressToPage1}>
                    <Text>点击重置路由,并跳转回到第一页</Text>
                </TouchableOpacity>


            </View>
        );
    }

    componentDidMount() {
        //this.player.presentFullscreenPlayer()
        //this.player.seek(0)
    }
    componentWillMount() {
        console.log(this.props.navigation)
        this.props.navigation.setParams({
            onRightButtonPress:this.onRightButtonPress,
            onLeftButtonPress:this.onLeftButtonPress
        })
    }
    _onPress = ()=>{
        AppSetting.message = (parseInt(AppSetting.message) + 1).toString()
        this.props.navigation.setParams({})

        this.setState({obj:{...this.state.obj,a:'2'}},()=>{
            console.log(this.state.obj)
        })
    }
    onRightButtonPress = ()=>{

    }
    _onPressToPage1 = ()=>{
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'Page1', params: { token: '123456' }})
            ]
        })

        this.props.navigation.dispatch(resetAction);
        //this.props.navigation.init()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 300,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default Page4;