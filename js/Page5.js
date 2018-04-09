/**
 * Created by git on 17/7/25.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Animated} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
class Page5 extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state={
            top:new Animated.Value(0)
        }
    }
    static navigationOptions = ({ navigation,screenProps }) => ({
        headerTitle:'page5',
        //header:navigation.state.params && navigation.state.params.header
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
        let header =
            <Animated.View style={[styles.headView]}>
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                    <Image source={require('./img/icon_return_white.png')}/>
                </TouchableOpacity>
            </Animated.View>
        return (
            <View style={styles.container}>
                {header}
                <ImageViewer imageUrls={images} onClick={this._change}/>

            </View>
        );
    }
    _change = ()=>{
        //this.props.navigation.goBack()
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

export default Page5;