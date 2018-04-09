/**
 * Created by git on 17/6/4.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, InteractionManager, TextInput, Platform, TouchableWithoutFeedback} from 'react-native';
import AppSetting from './AppSetting'
import App from './App'

import dismissKeyboard from 'react-native-dismiss-keyboard'
class Page3 extends React.Component
{
    constructor(props, context)
    {
        super(props, context);

        this.state={
            display:''
        }
    }

    static navigationOptions = ({ navigation,screenProps }) => ({
           headerTitle:'page3',
           headerRight:(
                <TouchableOpacity onPress={navigation.state.params.onRightButtonPress } style={{marginRight:10}}>
                    <Text>{AppSetting.message}</Text>
                </TouchableOpacity>
           ),
           headerTintColor: navigation.state.params.headerTintColor || 'yellow',
    })
    static cardStyle = ({navigation}) => ({
           onTransitionEnd:()=>{console.log('onTransitionEnd')}
    })
    render()
    {
        console.warn('page3');
        let {display} = this.state;
        let  Display = Platform.OS == 'ios'?{display:{display}}:null;
        let dot = React.createElement(TextInput,{ ref:"textInput",style:{height:30,width:350,backgroundColor:'red'}, keyboardType:"numeric", returnKeyType:"go", Display});
        return (
            <TouchableWithoutFeedback  onPress={()=>{dismissKeyboard()}}>
                <View style={styles.container} behavior="padding">
                    <Text>Page3</Text>
                    <TouchableOpacity onPress={this._onPress}>
                        <Text>点击跳转到Page4</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this._onChange}>
                        <Text>点击修改样式</Text>
                    </TouchableOpacity>
                    {dot}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    componentWillMount() {
        console.log(this.props.navigation)
        console.log(this.props.navigation.state.params.info)
        console.log(this.props.routes)
        this.props.navigation.setParams({
            onRightButtonPress:this.onRightButtonPress,
        })
    }

    _onChange = ()=>{
        this.props.navigation.setParams({
            headerTintColor: '#ddd'
        })

        //console.log(this.refs['textInput'])
        //if(this.refs['textInput'].props.display == 'none'){
        //    this.setState({display:''});
        //}else{
        //    this.setState({display:'none'});
        //}
        //this.refs['textInput'].measureInWindow((x, y, width, height)=>{
        //    console.log(x, y, width, height)
        //})
    }
    _onPress = ()=>{
        this.props.navigation.navigate('Page4',{
            callback :this._callback
        }
    )}
    _callback = ()=>{
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigation.setParams({
                //headerTintColor: '#fff'
            })
        console.log('来自page4');
        })
    }
    onRightButtonPress = ()=>{
        console.log(this.props.navigation)
        console.log('点击了右键')
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        width:200,
        height:200,
        backgroundColor:'red',
    }
});

export default Page3;