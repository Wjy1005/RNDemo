'use strict';

import React from 'react';
import PropTypes from 'prop-types'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    TouchableWithoutFeedback,
    PermissionsAndroid,
    KeyboardAvoidingView,
    ScrollView,
    WebView
} from 'react-native';
import RNKeyboard from './keyBoards/RNKeyboard'
import AppSetting from './until/AppSetting'
import dismissKeyboard from 'dismissKeyboard'
import {iOS} from "./Common/util/Constant";
import RNAndroidAutoUpdate from "react-native-android-auto-update";
import User from './network/User'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selected: true,
            buttonState: 'upload',
            json: '',
            value: ''
        }
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        // headerTitle:'page1',
        headerRight: (
            <TouchableOpacity
                onPress={() => {
                    navigation.state.params.onRightButtonPress && navigation.state.params.onRightButtonPress()
                }}
                style={{marginRight: 10}}>
                <Text>右边按钮</Text>
            </TouchableOpacity>
        ),
        headerLeft: <View style={{width: 24}}/>
    });

    render() {
        let dot = React.createElement(TextInput, {
            ref: "textInput", style: {height: 30, width: 350, backgroundColor: 'red', marginTop: 200},
            keyboardType: "numeric", returnKeyType: "go", onChangeText: this._onChangeText, value: this.state.value
        });
        let dot1 = React.createElement(TextInput, {
            ref: "textInput", style: {height: 30, width: 350, backgroundColor: 'green'},
            keyboardType: "numeric", returnKeyType: "go", onChangeText: this._onChangeText, value: this.state.value
        });
        return (
            <TouchableWithoutFeedback onPress={() => {
                dismissKeyboard()
            }}>
                <View style={styles.container} ref='ScrollView'>
                    <Text>Page1</Text>
                    <TouchableOpacity onPress={this._onClick}>
                        <Text>点击跳转到RNKeyboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPress}>
                        <Text>点击跳转到AddPage</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onDownLoadApk}>
                        <Text>点击下载apk</Text>
                    </TouchableOpacity>
                    {dot}
                    {dot1}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _onClick = () => {
        this.props.navigation.navigate('RNKeyboard');
    }
    onRightButtonPress =  () => {
        console.log(this.props.navigation);
        console.log('page1  点击了右键');
        // try {
        //     User.Url_name({});
        // }catch (e) {
        //
        // }

    }

    componentWillMount() {
        console.log(this.props.navigation);
        //为右键添加事件
        this.props.navigation.setParams({
            onRightButtonPress: this.onRightButtonPress,
        })
    }

    componentDidMount = async () => {
        this.setState({json: ''});
        AppSetting.getIntroduceSkiped()
            .then((json) => {
                console.log(json);
                this.setState({json})
            });

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
            const granted1 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            );
            if (granted1 === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }

            const granted2 = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                // {
                //     //第一次请求拒绝后提示用户你为什么要这个权限
                //     'title': 'Need to storage permissions ',
                //     'message': 'Please agree with storage permissions '
                // }
            )
            if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
                //this.show("你已获取了读写权限")
            } else {
                //this.show("获取读写权限失败")
                alert('Failed to get storage permission')
            }
        }
        catch
            (err) {
            console.warn(err)
        }
    }

    _onChangeText = (text) => {
        //if(text){
        //    this.textInput.setNativeProps('')
        //}
        this.setState({value: text})
    };

    _onPress = () => {
        this.props.navigation.navigate('AddPage');
    };

    _onDownLoadApk = () => {
        // try {
        //     if (iOS) {
        //         return;
        //     }
        //     console.warn('download');
        //     RNAndroidAutoUpdate.goToDownloadApk('http://download.fjwing.cn/userdown/downUrl/apprelease');
        // } catch (e) {
        //     console.warn(e);
        // }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default Home;