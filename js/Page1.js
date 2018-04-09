/**
 * Created by git on 17/6/4.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Keyboard} from 'react-native';
import Page3 from './Page3'
import RNKeyboard from './keyBoards/RNKeyboard'
import {StackNavigator,TabNavigator,TabBarBottom, DrawerNavigator}from 'react-navigation'
//import CameraRollPicker from 'react-native-camera-roll-picker';
import AppSetting from './until/AppSetting'
import MyDiyKeyBoard from './keyBoards/RNKeyboard'
import dismissKeyboard from 'dismissKeyboard'
import BaiduMap from 'react-native-git-baiduMap'
import Demo from 'react-native-git-test'
import Test from 'react-native-git-myDemo'
class Page1 extends React.Component
{
    constructor(props, context)
    {
        super(props, context);

        this.state={
            selected:true,
            buttonState:'upload',
            json:'',
            value:''
        }
    }

    static navigationOptions = ({ navigation,screenProps }) => ({
        //headerTitle:'page1',
        //headerRight:(
        //    <TouchableOpacity
        //        onPress={()=>{navigation.state.params.onRightButtonPress && navigation.state.params.onRightButtonPress() } }
        //                      style={{marginRight:10}}>
        //        <Text>右边按钮</Text>
        //    </TouchableOpacity>
        //),
        //headerLeft: <View style={{ width: 24 }}/>
    })

    render()
    {
        console.warn('page1');
        let dot = React.createElement(TextInput,{ ref:"textInput",style:{height:30,width:350,backgroundColor:'red',marginTop:200},
            keyboardType:"numeric", returnKeyType:"go", onChangeText:this._onChangeText,value:this.state.value});
        let dot1 = React.createElement(TextInput,{ ref:"textInput",style:{height:30,width:350,backgroundColor:'green'},
            keyboardType:"numeric", returnKeyType:"go", onChangeText:this._onChangeText,value:this.state.value});

        return (

            <TouchableWithoutFeedback onPress={()=>{dismissKeyboard()}} >
                <ScrollView style={styles.container} ref='ScrollView'>
                    <Text>Page1</Text>
                    <TouchableOpacity onPress={this._onPress}>
                    <Text>点击跳转到Page3</Text>
                     </TouchableOpacity>
                    <TouchableOpacity onPress={this._onClick}>
                    <Text>点击跳转到RNKeyboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{BaiduMap.test()}}>
                        <Text>点击跳转原生页面</Text>
                    </TouchableOpacity>
                    {dot}
                    {dot1}
                    <View style={{width:100,height:100}}>
                        <Demo style={{flex:1}}/>
                    </View>
                    <TouchableOpacity style={{width:100,height:30,borderRadius:10,backgroundColor:'red'}} onPress={this._onTest}/>
                    <TouchableOpacity style={{width:100,height:30,borderRadius:10,backgroundColor:'yellow'}} onPress={this._onTest2}/>
                    <TouchableOpacity style={{width:100,height:30,borderRadius:10,backgroundColor:'green'}} onPress={()=>{this.props.navigation.navigate('DrawerOpen')}}/>
                </ScrollView>
            </TouchableWithoutFeedback>

        );
    }

    _onPress = ()=>{
        this.props.navigation.navigate('Page3',{info:'传值过去'})
    }
    _onClick = ()=>{
        this.props.navigation.navigate('RNKeyboard');
    }
    onRightButtonPress = ()=>{
        console.log(this.props.navigation);
        console.log('page1  点击了右键');
    }
    componentWillMount() {
        console.log(this.props.navigation)
        //为右键添加事件
        this.props.navigation.setParams({
            onRightButtonPress:this.onRightButtonPress,
        })
    }

    componentDidMount() {
        this.setState({json:''})
        AppSetting.getIntroduceSkiped()
            .then((json)=>{
                console.log(json)
                this.setState({json})
            })
    }

    _onChangeText = (text)=>{
        //if(text){
        //    this.textInput.setNativeProps('')
        //}
        this.setState({value:text})
    }

    _onTest = ()=>{
        Test.test();
    }

    _onTest2 = ()=>{
        Test.test2();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor:'yellow'
    },
});


export default Page1;