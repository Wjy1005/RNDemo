/**
 * Created by git on 17/7/25.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Animated} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
class index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state={
            top:new Animated.Value(0)
        }
    }
    static navigationOptions = ({ navigation,screenProps }) => ({
        header:null
    })

    componentWillMount() {
        this.props.navigation.setParams({
            header:null
        })
    }
    render()
    {
        let images = [{
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
        }, {
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
        }, {
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
        }]

        return (
            <View style={styles.container}>
                <ImageViewer imageUrls={images} onClick={this._change} renderHeader={this._renderHeader}/>
            </View>
        );
    }

    _change = (event)=>{
        console.log(event);
        //this.props.navigation.goBack()
    }

    _renderHeader = ()=>{
        return (
            <Animated.View style={[styles.headView]}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <Image source={require('./img/icon_return_white.png')}/>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headView:{
        height:64,
        backgroundColor:'red',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:10,
        paddingTop:10,
        position:'absolute',
        top:0,
        left:0,
        right:0,
    }
});

export default index;