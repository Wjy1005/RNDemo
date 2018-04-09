/**
 * Created by git on 17/9/1.
 * @flow
 */

'use strict';

import React, {PropTypes} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import CachedImage from 'react-native-cached-image'

class index extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Text>带缓存的图片</Text>
                <CachedImage
                    source={{uri:'http://f.hiphotos.baidu.com/zhidao/pic/item/0bd162d9f2d3572c74aa14438f13632763d0c3e1.jpg'}}
                    style={styles.image}
                    onLoadStart={()=>{console.log('CachedImage')}}
                />
                <Text>不带缓存的图片</Text>
                <Image source={{uri:'http://f.hiphotos.baidu.com/zhidao/pic/item/0bd162d9f2d3572c74aa14438f13632763d0c3e1.jpg'}}
                       style={styles.image}
                       onLoadStart={()=>{console.log('Image')}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default index;